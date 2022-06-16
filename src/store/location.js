import axios from "axios";
import { writable } from "svelte/store";

export const provinces = writable([]);
export const cities = writable([]);
export const districts = writable([]);
export const subDistricts = writable([]);

export const fetchProvinces = async () => {
	try {
		const res = await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/provinsi`);
		const body = await res.data;
		provinces.set(body.provinsi);
	} catch (error) {
		console.error(error);
	}
};
export const fetchCities = async (query) => {
	try {
		const res = await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${query}`);
		const body = await res.data;
		cities.set(body.kota_kabupaten);
	} catch (error) {
		console.error(error);
	}
};
export const fetchDistricts = async (query) => {
	try {
		const res = await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${query}`);
		const body = await res.data;
		districts.set(body.kecamatan);
	} catch (error) {
		console.error(error);
	}
};
export const fetchSubDistricts = async (query) => {
	try {
		const res = await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${query}`);
		const body = await res.data;
		subDistricts.set(body.kelurahan);
	} catch (error) {
		console.error(error);
	}
};