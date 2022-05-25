import axios from "axios";
import { writable } from "svelte/store";

const url = '/api/product';

export const product = writable([]);


export const fetchProduct = async () => {
    try {
        const res = await axios.get(url);
        const data = await res.data.data;
        product.set(data);
    } catch (error) {
        console.log(error.response);
    }
}

export const postProduct = async (newProduct) => {
    axios
        .post(url, newProduct)
        .then(function (response) {
            console.log(response);
            fetchProduct();
        })
        .catch(function (error) {
            console.log(error);
        });
}