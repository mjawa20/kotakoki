import db from '../../../../db';
import { responseBuilder } from '../_api';
import { uid } from 'uid';
import { uploadBase64 } from '../../../utils';

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
		if (collection.imageUrl) {
			const dir = 'static/assets/upload/img/collection';
			const name = uid()
			const base64 = collection.imageUrl
			uploadBase64(dir, name, base64)
			collection.imageUrl = `${dir.replace('static', '')}/${name}.png`
		}
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
