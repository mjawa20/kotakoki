import Product from "../../../../db/models/product";
import { responseBuilder } from "../_api";

export async function get({ params }) {
  const product = await Product.findOne({ where: { id: params.id } })
  return responseBuilder(200, 'success', product)
}

export async function del({ params }) {
  await Product.destroy({ where: { id: params.id } })
  return responseBuilder(200, 'product has ben deleted')
}
