import db from '../../../../db';
import { filterBuilder, responseBuilder } from '../_api';
import { uploadBase64 } from '../../../utils';
import { unlink } from "fs";

export async function get({ url }) {
	try {
		const collections = await db.models.collection.findAndCountAll({ ...filterBuilder(url) });
		return responseBuilder(200, 'success', collections);
	} catch (error) {
		console.log(error);
		return responseBuilder(400, error);
	}
}

export async function post({ request }) {
	try {
		const collection = await request.json();
		if (collection.imageUrl) {
			const dir = 'static/assets/upload/img/collection';
			collection.imageUrl = uploadBase64(dir, collection.imageUrl)
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
		if (collection.imageUrl && collection.updateImage) {
			const dir = 'static/assets/upload/img/collection';
			collection.imageUrl = uploadBase64(dir, collection.imageUrl)
			unlink(`static${collection.oldImage}`, (err) => {
				console.log(err);
			})
		}
		await db.models.collection.update(collection, { where: { id: collection.id } });
		return responseBuilder(200, 'collection has been updated', collection);
	} catch (error) {
		return responseBuilder(400, error);
	}
}
