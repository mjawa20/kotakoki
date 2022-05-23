import Collection from "../../../../db/models/collection";
import { responseBuilder } from "../_api";

export async function get({ params }) {
  const collection = await Collection.findOne({ where: { id: params.id } })
  return responseBuilder(200, 'success', collection)
}

export async function del({ params }) {
  await Collection.destroy({ where: { id: params.id } })
  return responseBuilder(200, 'collection has ben deleted')
}
