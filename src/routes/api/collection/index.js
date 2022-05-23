import Collection from "../../../../db/models/collection";

export async function get() {
  const collections = await Collection.findAll()
  return {
    status: 200,
    body: collections
  };
}
