import db from '../../../../db';
import { responseBuilder } from '../_api';

export async function get({ params }) {
	try {
		const category = await db.models.category.findOne({ where: { id: params.id } });
		return responseBuilder(200, 'success', category);
	} catch (error) {
		return responseBuilder(400, error);
	}
}

export async function del({ params }) {
	try {
		await db.models.category.destroy({ where: { id: params.id } });
		return responseBuilder(200, 'category has ben deleted');
	} catch (error) {
		return responseBuilder(400, error);
	}
}
