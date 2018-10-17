// @flow

import type { ForecastDateItemType, ForecastDataRowType, OpenweatherResponseData } from './types';

export default {

	// normalizeData returns a new data structure which matches the CSV file one
	normalizeData(data: OpenweatherResponseData): Array<ForecastDateItemType> {
		return data.list.map((r) => {
			return {
				date: r.dt_txt,
				temp: r.main.temp,
			};
		});
	},

	formatCel(time: string, temp: string) {
		return {
			time,
			temp,
			celsius: (parseFloat(temp) - 273.15).toFixed(1),
		};
	},

	// groupDataByDate creates a better structured array, which we can use out of box on the view side
	groupDataByDate(data: Array<ForecastDateItemType>): Array<ForecastDataRowType> {
		const obj: Object = {};

		// Restructure data to make easier to work with
		for (let i = 0; i < data.length; i++) {
			const r = data[i];
			const dateTime = r.date.split(' ');
			const date = dateTime[0];
			const time = dateTime[1].replace(new RegExp(':00$'), '');

			// Check if obj[date] already set if so just extend else create it
			if (obj[date]) {
				obj[date] = {
					...obj[date],
					times: {
						...obj[date].times,
						[time]: this.formatCel(time, r.temp),
					},
				};
			} else {
				obj[date] = {
					date,
					times: { [time]: this.formatCel(time, r.temp) },
				};
			}
		}

		// Convert object to array so we don't need to use extra code or lodash
		const res = Object.keys(obj).map(k => obj[k]);

		return res;
	},
};
