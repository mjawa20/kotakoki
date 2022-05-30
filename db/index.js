import config from '../config/config';
import { Sequelize } from 'sequelize';
import categoryModel from './models/category';
import collectionModel from './models/collection';
import productModel from './models/product';
import imageModel from './models/image';
import carouselModel from './models/carousel';
import cartModel from './models/cart';
import userModel from './models/user';

const { host, port, username, password, database, dialect } = config.development;

const db = new Sequelize(database, username, password, {
	host,
	port,
	dialect
});

categoryModel(db);
collectionModel(db);
productModel(db);
imageModel(db);
carouselModel(db);
cartModel(db);
userModel(db);

Object.keys(db.models).forEach((modelName) => {
	if (db.models[modelName].associate) {
		db.models[modelName].associate(db.models);
	}
});

export default db;