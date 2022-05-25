import axios from "axios";
import { writable } from "svelte/store";

export const product = writable([]);

export const fetchProduct = async () => {
    try {
        const res = await axios.get('/api/product');
        const data = await res.data.data;
        product.set(data);
    } catch (error) {
        console.log(error.response);
    }
}