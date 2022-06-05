import { uid } from 'uid';
import db from '../../../../db';
import bcrypt from 'bcrypt';
import { responseBuilder } from '../_api';

export async function post({ request, locals }) {
    try {
        const req = await request.json();
        let user = await db.models.user.findOne({ where: { email: req.email } });

        if (!user) {
            return responseBuilder(401, 'Incorrect Email or Password');
        }

        if (!bcrypt.compareSync(req.password, user.password)) {
            return responseBuilder(401, 'Incorrect Email or Password');
        }
        const sessionId = uid();
        user.sessionId = sessionId
        await user.save()
        
        user = user.dataValues
        delete user.password

        locals.session.data = { authenticated: true, sessionId, ...user }
        console.log('==========================RESPONSE');
        return responseBuilder(200, 'success', null, locals.session.data)
    } catch (error) {
        return responseBuilder(400, error);
    }
}
