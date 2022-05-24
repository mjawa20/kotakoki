import Category from "../../../../db/models/category";
import { responseBuilder } from "../_api";

export async function get({ params }) {
  const category = await Category.findOne({ where: { id: params.id } })
  return responseBuilder(200, 'success', category)
}

export async function del({ params }) {
  await Category.destroy({ where: { id: params.id } })
  return responseBuilder(200, 'category has ben deleted')
}
