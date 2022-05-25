export const objectToQueryParam = (obj) => {
  if (!obj) return ""
  let query = [];
  Object.keys(obj).forEach(function (key) {
    query.push(`${key}=${obj[key]}`)
  });
  return query.join('&')
}