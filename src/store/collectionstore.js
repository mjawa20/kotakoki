import axios from 'axios';
import { writable } from 'svelte/store';
import { objectToQueryParam } from '../utils';

export const collections = writable([]);

export const fetchCollections = async (query) => {
	try {
		const res = await axios.get(`/api/collection?${objectToQueryParam(query)}`);
		const body = await res.data;
		collections.set(body.data);
	} catch (error) {
		console.error(error.response);
	}
};