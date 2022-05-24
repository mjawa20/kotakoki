import env from 'dotenv';
env.config();

const config = {
	development: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		host: process.env.DATABASE_HOST,
		dialect: process.env.DATABASE_DIALECT,
		port: process.env.DATABASE_PORT
	}
};

export default config;
