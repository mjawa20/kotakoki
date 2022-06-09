import axios from 'axios';
import { writable } from 'svelte/store';
import { objectToQueryParam } from '../utils';

export const orderItems = writable([]);

export const fetchOrderItems = async (query) => {
	try {
		const res = await axios.get(`/api/orderItem?${objectToQueryParam(query)}`);
		const body = await res.data;
		orderItems.set(body.data);
	} catch (error) {
		console.error(error.response);
	}
};

export const postOrderItem = async (newOrderItem) => {
	try {
		await axios.post('/api/orderItem', newOrderItem)
	} catch (error) {
		console.error(error.response);
	}
}

export const deleteOrderItem = async (id) => {
	try {
		await axios.delete('/api/orderItem/' + id)
	} catch (error) {
		console.error(error.response);
	}
}
export const updateOrderItem = async (newOrderItem) => {
	try {
		await axios.put('/api/orderItem', newOrderItem)
	} catch (error) {
		console.error(error.response);
	}
}