import fs from 'fs';
import { uid } from 'uid';
import { sortNumber, sortString } from '../lib/table/sorting';

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


export const clearData = (data, excludes = []) => {
  excludes.forEach(key => delete data[key])
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((d) => {
        clearData(d)
      })
    } else {
      if (data[key] === null) data[key] = ""  
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

export const validate = (data, excludes = []) => {
  excludes = ["id", "createdAt", "updatedAt", ...excludes]

  const filtered = Object.keys(data).filter((key) => !excludes.includes(key))
  for (const key of filtered) {
    if (!data[key]) {
      return false
    }
  }
  return true;
}

export function clickOutside(node) {

  const handleClick = event => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('click_outside', node)
      )
    }
  }

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  }
}

export const sortProduct = (data, dir, key) => {
  if (key === 'name') {
    return sortString(data, dir, key);
  }
  return sortNumber(data, dir, key)
}