import axios from 'axios';
import { writable } from 'svelte/store';
import { objectToQueryParam } from '../utils';

export const carts = writable([]);

export const fetchCarts = async (query) => {
    try {
        const res = await axios.get(`/api/cart?${objectToQueryParam(query)}`);
        const body = await res.data;
        carts.set(body.data);
    } catch (error) {
        console.error(error.response);
    }
};
export const fetchCart = async (query) => {
    try {
        const res = await axios.get(`/api/cart/${query}}`);
        const body = await res.data;
        carts.set(body.data);
    } catch (error) {
        console.error(error.response);
    }
};

export const postCart = async (newCart) => {
    try {
        await axios.post('/api/cart', newCart)
    } catch (error) {
        console.error(error.response);
    }
}

export const deleteCart = async (id) => {
    try {
        await axios.delete('/api/cart/' + id)
    } catch (error) {
        console.error(error.response);
    }
}

export const updateCart = async (newCart) => {
    try {
        await axios.put('/api/cart/', newCart)
    } catch (error) {
        console.error(error.response);
    }
}