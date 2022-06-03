import { Sequelize } from "sequelize";
import db from "../../../db";

export function responseBuilder(statusCode, message, data) {
	const response = {
		status: statusCode,
		body: { message },
	};
	if (data) response.body.data = data;
	return response;
}

export const whereBuilder = (selectors, keyword) => {
	if (!selectors || !keyword) return
	const where = { [Sequelize.Op.or]: [] };
	selectors.split(",").forEach((field) => {
		const q = {}
		q[field] = {
			[Sequelize.Op.like]: `%${keyword}%`
		}
		where[Sequelize.Op.or].push(q)
	})
	return where
}

export const filterBuilder = (url) => {
	let filter = {}
	const offset = +url.searchParams.get('offset')
	const limit = +url.searchParams.get('limit')
	const keyword = url.searchParams.get('keyword')
	const selectors = url.searchParams.get('selectors')
	const dir = url.searchParams.get('dir')
	const key = url.searchParams.get('key') || ''
	const keys = key.split('.')

	if ((offset || offset === 0) && limit) filter = { offset, limit }
	if (keyword && selectors) filter = { where: whereBuilder(selectors, keyword), ...filter }
	if (dir && key) filter = keys.length == 2 ? { order: [[db.models[keys[0]], keys[1], dir]] } : { order: [[key, dir]] }
	return filter
}