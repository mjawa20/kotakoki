import Category from "../../../../db/models/category";
import { responseBuilder } from "../_api";

export async function get() {
  const categorys = await Category.findAll()
  return responseBuilder(200, 'success', categorys)
}

export async function post({ request }) {
  const category = await request.json()
  await Category.create(category)
  return responseBuilder(200, 'category has been created', category)
}

export async function put({ request }) {
  const category = await request.json()
  await Category.update(category, { where: { id: category.id } })
  return responseBuilder(200, 'category has been updated', category)
}

