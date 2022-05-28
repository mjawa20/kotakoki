import axios from "axios";
import { writable } from "svelte/store";
import { objectToQueryParam } from "../utils";

const url = '/api/product';

export const products = writable([]);

export const fetchProducts = async (query) => {
	try {
		const res = await axios.get(`${url}?${objectToQueryParam(query)}`);
		const body = await res.data;
		products.set(body.data);
	} catch (error) {
		console.log(error.response);
	}
}
export const fetchProduct = async (id) => {
	try {
		const res = await axios.get(`${url}/${id}`);
		const body = await res.data;
		products.set(body.data);
	} catch (error) {
		console.log(error.response);
	}
}

export const postProduct = async (newProduct) => {
	try {
		await axios.post(url, newProduct)
	} catch (error) {
		console.log(error.response);
	}
}

export const deleteProduct = async (id) => {
	try {
		await axios.delete('/api/product/' + id)
	} catch (error) {
		console.error(error.response);
	}
}

export const updateProduct = async (newProduct) => {
	try {
		await axios.put('/api/product/', newProduct)
	} catch (error) {
		console.error(error.response);
	}
}