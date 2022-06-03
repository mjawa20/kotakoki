import db from '../../../../db';
import { filterBuilder, responseBuilder } from '../_api';
import bcrypt from 'bcrypt';


const saltRounds = 10;

export async function post({ request }) {
	try {
		const user = await request.json();
		user.password = bcrypt.hashSync(user.password, saltRounds);

		await db.models.user.create(user);
		return responseBuilder(200, 'user has been created', user);
	} catch (error) {
		return responseBuilder(400, error);
	}
}
