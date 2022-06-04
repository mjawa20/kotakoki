import * as cookie from 'cookie';
import db from '../../../../db';
import { responseBuilder } from '../_api';

export async function get({ request }) {

    try {
        const cookies = cookie.parse(request.headers.get('cookie') || "")
        const user = await db.models.user.findOne({ where: { sessionId: cookies.session_id } });
        
        if (!user) {
            return responseBuilder(401, 'Session Not Found');
        }

        const headers = {
            'Set-Cookie': cookie.serialize('session_id', user.sessionId, {
                httpOnly: true,
                maxAge: 0,
                sameSite: 'lax',
                path: '/'
            })
        }

        user.sessionId = null;
        await user.save()
        console.log('madev');
        return {
            status: 200,
            headers,
        }
    } catch (error) {
        console.log('--------------------');
        return responseBuilder(400, error);
    }
}
