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
		// const user = await request.json();
		bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
				console.log(hash);
				return responseBuilder(200, 'user has been created', 'as');
			});
		});
		// await db.models.user.create(user);
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
