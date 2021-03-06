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
export const fetchCollection = async (query) => {
	try {
		const res = await axios.get(`/api/collection/${query}}`);
		const body = await res.data;
		collections.set(body.data);
	} catch (error) {
		console.error(error.response);
	}
};

export const postCollection = async (newCollections) => {
	try {
		await axios.post('/api/collection', newCollections)
	} catch (error) {
		console.error(error.response);
	}
}

export const deleteCollection = async (id) => {
	try {
		await axios.delete('/api/collection/' + id)
	} catch (error) {
		console.error(error.response);
	}
}

export const updateCollection = async (newCollection) => {
	try {
		await axios.put('/api/collection/',newCollection)
	} catch (error) {
		console.error(error.response);
	}
}