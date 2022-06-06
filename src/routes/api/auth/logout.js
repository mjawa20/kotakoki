import db from '../../../../db';
import { responseBuilder } from '../_api';

export async function get({ locals }) {
    try {
        if (locals.session.data?.sessionId) {
            const user = await db.models.user.findOne({ where: { sessionId: locals.session.data?.sessionId } });
            user.sessionId = null;
            await user.save()
            locals.session.destroy()
            return responseBuilder(200, 'success')
        } else {
            return responseBuilder(401, 'Session Not Found');
        }
    } catch (error) {
        return responseBuilder(400, error);
    }
}
