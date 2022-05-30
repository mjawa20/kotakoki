
export const clearData = (data) => {
  Object.keys(data).forEach((key) => {
    console.log('===========================', key);
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
    console.log('end', Object.keys(data));
  })
}

const data = {
  id: "2f9ad834003",
  name: "ccc",
  price: 3422344,
  description: "dfgdfgdfgfdg",
  categoryId: 20,
  collectionId: 74,
  createdAt: "2022-05-26T07:38:02.000Z",
  updatedAt: "2022-05-26T07:38:02.000Z",
  images: [],
  collection: {
    id: 74,
    name: "aaaa",
    imageUrl: "/assets/upload/img/collection/4ac498d3eb7.png",
    createdAt: null,
    updatedAt: null
  },
  category: {
    id: 20,
    name: "ccccccc",
    createdAt: "2022-05-26T15:54:01.000Z",
    updatedAt: "2022-05-26T15:54:01.000Z"
  }
}
clearData(data)

console.log(data);