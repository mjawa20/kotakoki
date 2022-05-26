import fs from 'fs';

export const objectToQueryParam = (obj) => {
  if (!obj) return ""
  let query = [];
  Object.keys(obj).forEach(function (key) {
    if (obj[key]) {
      query.push(`${key}=${obj[key]}`)
    }
  });
  return query.join('&')
}

export const uploadBase64 = (dir, name, base64) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(`${dir}/${name}.png`, base64.replace('data:image/jpeg;base64,', ''), 'base64');
}

export const page = (page, limit = 10) => {
  return {
    offset: (page - 1) * limit,
    limit
  }
}

