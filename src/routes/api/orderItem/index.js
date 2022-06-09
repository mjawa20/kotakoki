import db from '../../../../db';
import { filterBuilder, responseBuilder } from '../_api';

export async function get({ url }) {
	try {
		const orderItems = await db.models.orderItem.findAndCountAll({ ...filterBuilder(url) });
		return responseBuilder(200, 'success', orderItems);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function post({ request }) {
	try {
		const orderItem = await request.json();
		await db.models.orderItem.create(orderItem);
		return responseBuilder(200, 'orderItem has been created', orderItem);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function put({ request }) {
	try {
		const orderItem = await request.json();
		await db.models.orderItem.update(orderItem, { where: { id: orderItem.id } });
		return responseBuilder(200, 'orderItem has been updated', orderItem);
	} catch (error) {
		return responseBuilder(400, error);
	}
}
