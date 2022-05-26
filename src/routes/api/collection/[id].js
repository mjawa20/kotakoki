import db from '../../../../db';
import { responseBuilder } from '../_api';
import { unlink } from "fs";

export async function get({ params }) {
	try {
		const collection = await db.models.collection.findOne({ where: { id: params.id } });
		return responseBuilder(200, 'success', collection);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function del({ params }) {
	try {
		const collection = await db.models.collection.findOne({ where: { id: params.id } });
		if (!collection) return
		await db.models.collection.destroy({ where: { id: params.id } });
		unlink(`static${collection.imageUrl}`, (err) => {
			console.log(err);
		})
		return responseBuilder(200, 'collection has ben deleted');
	} catch (error) {
		return responseBuilder(400, error);
	}
}
