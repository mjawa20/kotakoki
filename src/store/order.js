import axios from 'axios';
import { writable } from 'svelte/store';
import { objectToQueryParam } from '../utils';

export const orders = writable([]);

export const fetchOrders = async (query) => {
	try {
		const res = await axios.get(`/api/order?${objectToQueryParam(query)}`);
		const body = await res.data;
		orders.set(body.data);
	} catch (error) {
		console.error(error.response);
	}
};

export const postOrder = async (newOrder) => {
	try {
		let res = await axios.post('/api/order', newOrder)
		return res.data.data;
	} catch (error) {
		console.error(error.response);
	}
}

export const deleteOrder = async (id) => {
	try {
		await axios.delete('/api/order/' + id)
	} catch (error) {
		console.error(error.response);
	}
}
export const updateOrder = async (newOrder) => {
	try {
		await axios.put('/api/order', newOrder)
	} catch (error) {
		console.error(error.response);
	}
}