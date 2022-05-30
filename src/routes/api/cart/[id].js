import db from '../../../../db';
import { responseBuilder } from '../_api';

export async function get({ params }) {
	try {
		const cart = await db.models.cart.findOne({ where: { id: params.id } });
		return responseBuilder(200, 'success', cart);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function del({ params }) {
	try {
		await db.models.cart.destroy({ where: { id: params.id } });
		return responseBuilder(200, 'cart has ben deleted');
	} catch (error) {
		return responseBuilder(400, error);
	}
}
