import { Sequelize } from "sequelize";
import db from "../../../db";

export function responseBuilder(statusCode, message, data, session) {
	const response = {
		status: statusCode,
		body: { message },
	};
	if (data) response.body.data = data;
	if (session) response.body.session = session;
	return response;
}

export const whereBuilder = (selectors, keyword, op) => {
	if (!selectors || !keyword) return
	const where = { [Sequelize.Op.or]: [] };
	selectors.split(",").forEach((field) => {
		const q = {}
		q[field] = {
			[Sequelize.Op[op]]: op === "like" ? `%${keyword}%` : keyword
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
	const op = url.searchParams.get('op')
	const selectors = url.searchParams.get('selectors')
	const dir = url.searchParams.get('dir')
	const key = url.searchParams.get('key') || ''
	const keys = key.split('.')

	if ((offset || offset === 0) && limit) filter = { offset, limit }
	if (keyword && selectors) filter = { where: whereBuilder(selectors, keyword, op), ...filter }
	if (dir && key) filter = keys.length == 2 ? { order: [[db.models[keys[0]], keys[1], dir]] } : { order: [[key, dir]] }
	return filter
}