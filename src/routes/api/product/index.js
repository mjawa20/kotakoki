import db from "../../../../db";
import { responseBuilder } from "../_api";

export async function get() {
  const products = await db.models.product.findAll({ include: ['images'] })
  return responseBuilder(200, 'success', products)
}

export async function post({ request }) {
  const product = await request.json()
  await db.models.product.create(product)
  return responseBuilder(200, 'product has been created', product)
}

export async function put({ request }) {
  const product = await request.json()
  await db.models.product.update(product, { where: { id: product.id } })
  return responseBuilder(200, 'product has been updated', product)
}

