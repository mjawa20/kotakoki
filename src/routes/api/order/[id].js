import db from '../../../../db';
import { responseBuilder } from '../_api';

export async function get({ params }) {
	try {
		const order = await db.models.order.findOne({ where: { id: params.id } });
		return responseBuilder(200, 'success', order);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function del({ params }) {
	try {
		await db.models.order.destroy({ where: { id: params.id } });
		return responseBuilder(200, 'order has ben deleted');
	} catch (error) {
		return responseBuilder(400, error);
	}
}
