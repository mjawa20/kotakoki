import db from '../../../../db';
import { filterBuilder, responseBuilder } from '../_api';

export async function get({ url }) {
    try {
        const categories = await db.models.cart.findAndCountAll({ include: ['product'], ...filterBuilder(url) });
        return responseBuilder(200, 'success', categories);
    } catch (error) {
        return responseBuilder(400, error);
    }
}

export async function post({ request }) {
    try {
        const cart = await request.json();
        await db.models.cart.create(cart);
        return responseBuilder(200, 'cart has been created', cart);
    } catch (error) {
        return responseBuilder(400, error);
    }
}

export async function put({ request }) {
    try {
        const cart = await request.json();
        await db.models.cart.update(cart, { where: { id: cart.id } });
        return responseBuilder(200, 'cart has been updated', cart);
    } catch (error) {
        return responseBuilder(400, error);
    }
}
