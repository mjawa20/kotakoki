import config from '../config/config';
import { Sequelize } from 'sequelize';
import categoryModel from './models/category';
import collectionModel from './models/collection';
import productModel from './models/product';
import productImageModel from './models/productImage';


const { host, port, username, password, database, dialect } = config[process.env.NODE_ENV];

const db = new Sequelize(database, username, password, {
  host, port, dialect
});

categoryModel(db)
collectionModel(db)
productModel(db)
productImageModel(db)

Object.keys(db.models).forEach(modelName => {
  if (db.models[modelName].associate) {
    db.models[modelName].associate(db.models);
  }
});

export default db