import db from '../../../../db';
import { filterBuilder, responseBuilder } from '../_api';
import bcrypt from 'bcrypt';


const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

export async function get({ url }) {
	try {
		const users = await db.models.user.findAndCountAll({ ...filterBuilder(url) });
		return responseBuilder(200, 'success', users);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

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

export async function put({ request }) {
	try {
		const user = await request.json();
		await db.models.user.update(user, { where: { id: user.id } });
		return responseBuilder(200, 'user has been updated', user);
	} catch (error) {
		return responseBuilder(400, error);
	}
}
