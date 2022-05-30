import db from '../../../../db';
import { responseBuilder } from '../_api';
import { unlink } from "fs";

export async function get({ params }) {
	try {
		const product = await db.models.image.findOne({ where: { id: params.id } });
		return responseBuilder(200, 'success', product);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function del({ params }) {
	try {
		const image = await db.models.image.findOne({ where: { id: params.id } });
		if (!image) return
		await db.models.image.destroy({ where: { id: params.id } });
		unlink(`static${image.url}`, (err) => {
			console.log(err);
		})
		return responseBuilder(200, 'image has ben deleted');
	} catch (error) {
		return responseBuilder(400, error);
	}
}
