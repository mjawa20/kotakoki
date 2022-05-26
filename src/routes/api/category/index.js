import db from '../../../../db';
import { filterBuilder, responseBuilder } from '../_api';

export async function get({ url }) {
	try {
		const categories = await db.models.category.findAndCountAll({ ...filterBuilder(url) });
		return responseBuilder(200, 'success', categories);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function post({ request }) {
	try {
		const category = await request.json();
		await db.models.category.create(category);
		return responseBuilder(200, 'category has been created', category);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function put({ request }) {
	try {
		const category = await request.json();
		await db.models.category.update(category, { where: { id: category.id } });
		return responseBuilder(200, 'category has been updated', category);
	} catch (error) {
		return responseBuilder(400, error);
	}
}
