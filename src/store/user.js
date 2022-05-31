import axios from "axios";
import { writable } from "svelte/store";
import { objectToQueryParam } from "../utils";

const url = '/api/user';

export const users = writable([]);

export const fetchUsers = async (query) => {
	try {
		const res = await axios.get(`${url}?${objectToQueryParam(query)}`);
		const body = await res.data;
		users.set(body.data);
	} catch (error) {
		console.log(error.response);
	}
}
export const fetchUser = async (id) => {
	try {
		const res = await axios.get(`${url}/${id}`);
		const body = await res.data;
		users.set(body.data);
	} catch (error) {
		console.log(error.response);
	}
}

export const postUser = async (newUser) => {
	try {
		await axios.post(url, newUser)
	} catch (error) {
		console.log(error.response);
	}
}

export const deleteUser = async (id) => {
	try {
		await axios.delete('/api/user/' + id)
	} catch (error) {
		console.error(error.response);
	}
}

export const updateUser = async (newUser) => {
	try {
		await axios.put('/api/user/', newUser)
	} catch (error) {
		console.error(error.response);
	}
}