import db from '../../../../db';
import { responseBuilder } from '../_api';

export async function get({ params }) {
	try {
		const orderItem = await db.models.orderItem.findOne({ where: { id: params.id } });
		return responseBuilder(200, 'success', orderItem);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function del({ params }) {
	try {
		await db.models.orderItem.destroy({ where: { id: params.id } });
		return responseBuilder(200, 'orderItem has ben deleted');
	} catch (error) {
		return responseBuilder(400, error);
	}
}
