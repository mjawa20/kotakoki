import axios from 'axios';
import { writable } from 'svelte/store';

export const categories = writable([]);

export const fetchCategories = async () => {
	try {
		const res = await axios.get(`/api/category`);
		const body = await res.data;
		categories.set(body.data);
	} catch (error) {
		console.error(error.response);
	}
};

export const postCategory = async (newCategory) => {
	try {
		await axios.post('/api/category', newCategory)
	} catch (error) {
		console.error(error.response);
	}
}

export const deleteCategory = async (id) => {
	try {
		await axios.delete('/api/category/' + id)
	} catch (error) {
		console.error(error.response);
	}
}
export const updateCategory = async (newCategory) => {
	try {
		await axios.put('/api/category/', newCategory)
	} catch (error) {
		console.error(error.response);
	}
}