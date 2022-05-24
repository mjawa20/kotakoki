import db from "../../../../db";
import { responseBuilder } from "../_api";

export async function get() {
  const collections = await db.models.collection.findAll()
  return responseBuilder(200, 'success', collections)
}

export async function post({ request }) {
  const collection = await request.json()
  await db.models.collection.create(collection)
  return responseBuilder(200, 'collection has been created', collection)
}

export async function put({ request }) {
  const collection = await request.json()
  await db.models.collection.update(collection, { where: { id: collection.id } })
  return responseBuilder(200, 'collection has been updated', collection)
}

