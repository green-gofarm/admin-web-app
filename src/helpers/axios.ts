import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { ENV_DOMAIN } from './api';
import { auth, getFirebaseToken } from '../Firebase/firebase';

const axiosClient = axios.create({
	baseURL: ENV_DOMAIN,
	headers: {
		'content-type': 'application/json',
	},
});


axiosClient.interceptors.request.use(async (config) => {
	const token = await getFirebaseToken();
	if (!token) {
		auth.signOut();
		console.log("aaaa");
		throw new Error("Token does not exist");
	}

	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

axiosClient.interceptors.response.use((response) => {
	if (response && response.data) {
		return response.data;
	}

	return response;
}, (error) => {
	throw error;
});

export default axiosClient;

const urlWithParams = (url: string, params: Record<string, string>) => {
	const newUrl = new URL(url);
	if (params) {
		newUrl.search = new URLSearchParams(params).toString();
	}
	return newUrl;
}

const isAxiosError = (errorName: string | null): errorName is 'AxiosError' => {
	return errorName != null && errorName === 'AxiosError';
}

const isResponseError = (response: any): response is AxiosError => {
	return isAxiosError(response?.name);
}

export const axiosRequest = async (url: string, options: AxiosRequestConfig = {}, params: Record<string, string>) => {

	const preparedUrl = urlWithParams(url, params);

	const config: AxiosRequestConfig = {
		url: preparedUrl.toString(),
		...(options ?? {})
	}

	try {
		const response = await axiosClient(config);

		if (isResponseError(response)) {
			throw response;
		}

		return response;
	} catch (error) {
		console.log(error);
		throw error
	}
}
