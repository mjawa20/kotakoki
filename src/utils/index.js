import fs from 'fs';
import { uid } from 'uid';

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

export const uploadBase64 = (dir, base64) => {
  const name = uid()
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(`${dir}/${name}.png`, base64.replace('data:image/jpeg;base64,', ''), 'base64');
  return `${dir.replace('static', '')}/${name}.png`
}

export const page = (page, limit = 10) => {
  return {
    offset: (page - 1) * limit,
    limit
  }
}


export const clearData = (data) => {
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((d) => {
        clearData(d)
      })
    } else {
      switch (typeof data[key]) {
        case 'object':
          clearData(data[key])
          break;
        case 'string':
          data[key] = ''
          break;
        case 'number':
          data[key] = 0
          break;
        case 'boolean':
          data[key] = false
          break;
      }
    }
  })
}
