import db from '../../../../db';
import { filterBuilder, responseBuilder } from '../_api';
import { uploadBase64 } from '../../../utils';
import { unlink } from "fs";

export async function get({ url }) {
	try {
		const images = await db.models.image.findAndCountAll({ ...filterBuilder(url) });
		return responseBuilder(200, 'success', images);
	} catch (error) {
		console.log(error);
		return responseBuilder(400, error);
	}
}

export async function post({ request }) {
	try {
		const image = await request.json();
		if (image.url) {
			const dir = 'static/assets/upload/img/product';
			image.url = uploadBase64(dir, image.url)
		}
		await db.models.image.create(image);
		return responseBuilder(200, 'image has been created', image);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function put({ request }) {
	try {
		const image = await request.json();
		if (image.url && image.updateImage) {
			const dir = 'static/assets/upload/img/product';
			image.url = uploadBase64(dir, image.url)
			unlink(`static${image.oldImage}`, (err) => {
				console.log(err);
			})
		}
		await db.models.image.update(image, { where: { id: image.id } });
		return responseBuilder(200, 'image has been updated', image);
	} catch (error) {
		return responseBuilder(400, error);
	}
}
