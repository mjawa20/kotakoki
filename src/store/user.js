import axios from "axios";
import { writable } from "svelte/store";
import { objectToQueryParam } from "../utils";

const url = '/api/auth';

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


export const login = async (newUser) => {
	try {
		const res = await axios.post(`${url}/login`, newUser)
		console.log('success');
		return {
			status: res.status,
			message: res.data
		}
	} catch (error) {
		console.log('error');
		return {
			status: error.response.status,
			message: error.response.data.message
		}
	}
}
export const register = async (newUser) => {
	try {
		await axios.post(`${url}/register`, newUser)
	} catch (error) {
		console.log(error.response);
	}
}
