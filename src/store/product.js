import axios from "axios";
import { writable } from "svelte/store";

const url = '/api/product';

export const products = writable([]);

export const fetchProduct = async () => {
	try {
		const res = await axios.get(url);
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