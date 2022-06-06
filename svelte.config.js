import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			optimizeDeps: {
				include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
			},
			resolve: {
				alias: {
					$cookieSession: path.resolve('../src')
				},
			},
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
