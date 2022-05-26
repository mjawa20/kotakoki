import axios from 'axios';
import { writable } from 'svelte/store';
import { get } from "svelte/store";


export const categories = writable([]);

export const fetchCategories = async () => {
    try {
        const res = await axios.get(`/api/category`);
        const body = await res.data;
        categories.set(body.data);
    } catch (error) {
        console.error(error.response);
    }
};

export const postCategory = async (newCategory) => {
    axios
        .post('/api/category', newCategory)
        .then(function (response) {
            categories.set([...get(categories), response.data])

        })
        .catch(function (error) {
            console.log(error);
        });
}