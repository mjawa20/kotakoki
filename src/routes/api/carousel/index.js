import db from '../../../../db';
import { filterBuilder, responseBuilder } from '../_api';
import { uploadBase64 } from '../../../utils';
import { unlink } from "fs";

export async function get({ url }) {
    try {
        console.log(db.models.carousel);
        const carousels = await db.models.carousel.findAndCountAll({ ...filterBuilder(url) });
        return responseBuilder(200, 'success', carousels);
    } catch (error) {
        console.log(error);
        return responseBuilder(400, error);
    }
}

export async function post({ request }) {
    try {
        const carousel = await request.json();
        if (carousel.imageUrl) {
            const dir = 'static/assets/upload/img/carousel';
            carousel.imageUrl = uploadBase64(dir, carousel.imageUrl)
        }
        await db.models.carousel.create(carousel);
        return responseBuilder(200, 'carousel has been created', carousel);
    } catch (error) {
        return responseBuilder(400, error);
    }
}

export async function put({ request }) {
    try {
        const carousel = await request.json();
        if (carousel.imageUrl && carousel.updateImage) {
            const dir = 'static/assets/upload/img/carousel';
            carousel.imageUrl = uploadBase64(dir, carousel.imageUrl)
            unlink(`static${carousel.oldImage}`, (err) => {
                console.log(err);
            })
        }
        await db.models.carousel.update(carousel, { where: { id: carousel.id } });
        return responseBuilder(200, 'carousel has been updated', carousel);
    } catch (error) {
        return responseBuilder(400, error);
    }
}
