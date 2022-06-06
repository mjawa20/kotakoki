import db from '../../../../db';
import { filterBuilder, responseBuilder } from '../_api';


export async function get({ url }) {
    try {
        const users = await db.models.user.findAndCountAll({ ...filterBuilder(url) });
        return responseBuilder(200, 'success', users);
    } catch (error) {
        return responseBuilder(400, error);
    }
}