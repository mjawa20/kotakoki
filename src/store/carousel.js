import axios from 'axios';
import { writable } from 'svelte/store';
import { objectToQueryParam } from '../utils';

export const carousels = writable([]);

export const fetchCarousels = async (query) => {
	try {
		const res = await axios.get(`/api/carousel?${objectToQueryParam(query)}`);
		const body = await res.data;
		carousels.set(body.data);
	} catch (error) {
		console.error(error.response);
	}
};
export const fetchCarousel = async (query) => {
	try {
		const res = await axios.get(`/api/carousel/${query}}`);
		const body = await res.data;
		carousels.set(body.data);
	} catch (error) {
		console.error(error.response);
	}
};

export const postCarousel = async (newCarousels) => {
	try {
		await axios.post('/api/carousel', newCarousels)
	} catch (error) {
		console.error(error.response);
	}
}

export const deletecarousel = async (id) => {
	try {
		await axios.delete('/api/carousel/' + id)
	} catch (error) {
		console.error(error.response);
	}
}

export const updatecarousel = async (newcarousel) => {
	try {
		await axios.put('/api/carousel/',newcarousel)
	} catch (error) {
		console.error(error.response);
	}
}