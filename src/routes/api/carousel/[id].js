import db from '../../../../db';
import { responseBuilder } from '../_api';
import { unlink } from "fs";

export async function get({ params }) {
    try {
        const carousel = await db.models.carousel.findOne({ where: { id: params.id } });
        return responseBuilder(200, 'success', carousel);
    } catch (error) {
        return responseBuilder(400, error);
    }
}

export async function del({ params }) {
    try {
        const carousel = await db.models.carousel.findOne({ where: { id: params.id } });
        if (!carousel) return
        await db.models.carousel.destroy({ where: { id: params.id } });
        unlink(`static${carousel.imageUrl}`, (err) => {
            console.log(err);
        })
        return responseBuilder(200, 'carousel has ben deleted');
    } catch (error) {
        return responseBuilder(400, error);
    }
}
