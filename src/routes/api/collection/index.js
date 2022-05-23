import Collection from "../../../../db/models/collection";
import { responseBuilder } from "../_api";

export async function get() {
  const collections = await Collection.findAll()
  return responseBuilder(200, 'success', collections)
}

export async function post({ request }) {
  const collection = await request.json()
  await Collection.create(collection)
  return responseBuilder(200, 'collection has been created', collection)
}

export async function put({ request }) {
  const collection = await request.json()
  await Collection.update(collection, { where: { id: collection.id } })
  return responseBuilder(200, 'collection has been updated', collection)
}

