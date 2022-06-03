import * as cookie from 'cookie';
import { uid } from 'uid';
import db from '../../../../db';
import bcrypt from 'bcrypt';
import { responseBuilder } from '../_api';
import { Tedis } from 'tedis';

const store = new Tedis({ host: "127.0.0.1", port: 6379 })

export async function post({ request }) {
    try {
        const req = await request.json();
        const user = await db.models.user.findOne({ where: { email: req.email } });
        
        if (!user) {
            return responseBuilder(401, 'Incorrect Email or Password');
        }
        
        if (!bcrypt.compareSync(req.password, user.password)) {
            return responseBuilder(401, 'Incorrect Email or Password');
        }
        const cookieId = uid();
        
        await store.set(cookieId, JSON.stringify({
            email: user.email
        }));
        
        const headers = {
            'Set-Cookie': cookie.serialize('session_id', cookieId, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: 'lax',
                path: '/'
            })
        }
        return {
            status: 200,
            headers,
        }
    } catch (error) {
        console.log('--------------------');
        return responseBuilder(400, error);
    }
}
