import config from './../config/config';
import { Sequelize } from 'sequelize';

const { host, port, username, password, database, dialect } = config[process.env.NODE_ENV];
export const db = new Sequelize(database, username, password, {
  host, port, dialect
});
