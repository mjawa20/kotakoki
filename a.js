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
      }
    }
  })
}

const a = {
  b: {
    c: 'asdasdas'
  },
  d: 'asdasdadasdadad',
  e: [
    { f: 1 }
  ]
}

console.log(clearData(a), a);