// @flow

import axios from 'axios';
import config from 'app/config';

export default {

	// get sends a request to openweathermap with requested url and the added api key
	// then returns a promise
	get(url: string): Promise<any> {
		axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5';
		const params = {
			APPID: config.OPENWEATHER_API_KEY,
		};

		// TODO: remove before submit
		// return new Promise(((resolve) => {
		// 	setTimeout(() => {
		// 		resolve({
		// 			status: 200,
		// 			data: mockData,
		// 		});
		// 	}, 100);
		// }));

		return axios.get(url, { params })
			.then(response => response).catch((error) => {
				if (error.response) {
					return error.response;
				}

				console.log('Error', error.message);
				return error.message;
			});
	},
};
