import db from '../../../../db';
import { responseBuilder } from '../_api';

export async function get({ params }) {
	try {
		const product = await db.models.product.findOne({ where: { id: params.id } });
		return responseBuilder(200, 'success', product);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function del({ params }) {
	try {
		await db.models.product.destroy({ where: { id: params.id } });
		return responseBuilder(200, 'product has ben deleted');
	} catch (error) {
		return responseBuilder(400, error);
	}
}
