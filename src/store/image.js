import axios from 'axios';
import { writable } from 'svelte/store';
import { objectToQueryParam } from '../utils';

export const images = writable([]);

export const fetchImages = async (query) => {
    try {
        const res = await axios.get(`/api/image?${objectToQueryParam(query)}`);
        const body = await res.data;
        images.set(body.data);
    } catch (error) {
        console.error(error.response);
    }
};
export const fetchImage = async (query) => {
    try {
        const res = await axios.get(`/api/image/${query}}`);
        const body = await res.data;
        images.set(body.data);
    } catch (error) {
        console.error(error.response);
    }
};

export const postImage = async (newImages) => {
    try {
        await axios.post('/api/image', newImages)
    } catch (error) {
        console.error(error.response);
    }
}

export const deleteImage = async (id) => {
    try {
        await axios.delete('/api/image/' + id)
    } catch (error) {
        console.error(error.response);
    }
}

export const updateImage = async (newImage) => {
    try {
        await axios.put('/api/image/', newImage)
    } catch (error) {
        console.error(error.response);
    }
}