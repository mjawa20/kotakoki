import db from '../../../../db';
import { filterBuilder, responseBuilder } from '../_api';

export async function get({ url }) {
	try {
		const orders = await db.models.order.findAndCountAll({ ...filterBuilder(url) });
		return responseBuilder(200, 'success', orders);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function post({ request }) {
	try {
		const order = await request.json();
		let res = await db.models.order.create(order);
		return responseBuilder(200, 'order has been created', res);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function put({ request }) {
	try {
		const order = await request.json();
		await db.models.order.update(order, { where: { id: order.id } });
		return responseBuilder(200, 'order has been updated', order);
	} catch (error) {
		return responseBuilder(400, error);
	}
}
