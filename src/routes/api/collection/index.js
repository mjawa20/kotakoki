import db from '../../../../db';
import { responseBuilder } from '../_api';

export async function get() {
	try {
		const collections = await db.models.collection.findAll();
		return responseBuilder(200, 'success', collections);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function post({ request }) {
	try {
		const collection = await request.json();
		await db.models.collection.create(collection);
		return responseBuilder(200, 'collection has been created', collection);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function put({ request }) {
	try {
		const collection = await request.json();
		await db.models.collection.update(collection, { where: { id: collection.id } });
		return responseBuilder(200, 'collection has been updated', collection);
	} catch (error) {
		return responseBuilder(400, error);
	}
}
