import db from '../../../../db';
import { filterBuilder, responseBuilder } from '../_api';

export async function get({ url }) {
  try {
    const products = await db.models.product.findAndCountAll({ include: ['images'], ...filterBuilder(url) });
    return responseBuilder(200, 'success', products);
  } catch (error) {
    return responseBuilder(400, error);
  }
}

export async function post({ request }) {
  try {
    const product = await request.json();
    let option = {}
    if (product.images) option = { include: 'images' }
    await db.models.product.create(product, option);
    return responseBuilder(200, 'product has been created', product);
  } catch (error) {
    return responseBuilder(400, error);
  }
}

export async function put({ request }) {
  try {
    const product = await request.json();
    await db.models.product.update(product, { where: { id: product.id } });
    return responseBuilder(200, 'product has been updated', product);
  } catch (error) {
    return responseBuilder(400, error);
  }
}
