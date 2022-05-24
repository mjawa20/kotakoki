import axios from 'axios';
import { writable } from 'svelte/store';

export const collection = writable([]);

const fetchCollection = async () => {
	try {
		const res = await axios.get('/api/collection');
		const data = await res.data.data;
		collection.set(data);
	} catch (error) {
		console.error(error);
	}
};

fetchCollection();
