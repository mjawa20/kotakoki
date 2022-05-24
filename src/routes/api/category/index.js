import db from "../../../../db";
import { responseBuilder } from "../_api";

export async function get() {
  const categories = await db.models.category.findAll()
  return responseBuilder(200, 'success', categories)
}

export async function post({ request }) {
  const category = await request.json()
  await db.models.category.create(category)
  return responseBuilder(200, 'category has been created', category)
}

export async function put({ request }) {
  const category = await request.json()
  await db.models.category.update(category, { where: { id: category.id } })
  return responseBuilder(200, 'category has been updated', category)
}

