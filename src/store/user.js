import axios from "axios";
import { writable } from "svelte/store";
import { restReqeust } from ".";
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
		const res = await restReqeust({ method: 'post', url: url + '/login', data: newUser })
		return {
			status: res.status,
			message: res.body.message
		}
	} catch (error) {
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

export const logout = async () => {
	try {
		await axios.get(`${url}/logout`);
	} catch (error) {
		console.log(error.response);
	}
}