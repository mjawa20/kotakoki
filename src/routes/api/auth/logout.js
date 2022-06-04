import * as cookie from 'cookie';
import db from '../../../../db';
import { responseBuilder } from '../_api';

export async function get({ request }) {

    try {
        const cookies = cookie.parse(request.headers.get('cookie') || "")

        let user;
        if (cookies.session_id) {
            user = await db.models.user.findOne({ where: { sessionId: cookies.session_id } });
        }

        if (!user) {
            return responseBuilder(401, 'Session Not Found');
        }

        user.sessionId = null;
        await user.save()
        console.log('madev');
        
        return {
            status: 200,
            headers: {
                'Set-Cookie': cookie.serialize('session_id', '', {
                    path: '/',
                    expires: new Date(0),
                }),
            },
        };

    } catch (error) {
        console.log('--------------------');
        return responseBuilder(400, error);
    }
}
