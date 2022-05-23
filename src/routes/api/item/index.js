import Item from "../../../../db/models/item";
export async function get() {
  const items = await Item.findAll()
  return {
    status: 200,
    body: items
  };
}
