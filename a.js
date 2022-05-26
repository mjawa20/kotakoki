
export const whereBuilder = (selectors, keyword) => {
  const where = { $or: [] };
  selectors.split(",").forEach((field) => {
    const q = {}
    q[field] = {
      $like: `%${keyword}%`
    }
    where.$or.push(q)
  })
  return where
}

console.log(whereBuilder('a', 's'));