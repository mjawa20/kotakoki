import db from '../../../../db';
import { filterBuilder, responseBuilder } from '../_api';

export async function get(url) {
	try {
		const products = await db.models.image.findAndCountAll({ ...filterBuilder(url) });
		return responseBuilder(200, 'success', products);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function post({ request }) {
	try {
		const product = await request.json();
		await db.models.image.create(product);
		return responseBuilder(200, 'product has been created', product);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function put({ request }) {
	try {
		const product = await request.json();
		await db.models.image.update(product, { where: { id: product.id } });
		return responseBuilder(200, 'product has been updated', product);
	} catch (error) {
		return responseBuilder(400, error);
	}
}
