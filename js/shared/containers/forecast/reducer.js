// @flow

import type { ForecastCollectionType } from './types';
import forecastUtils from './utils';

const defaultState = {
	data: [],
	error: null,
	isLoading: false,
};

export default function reducer(state: ForecastCollectionType = defaultState, action) {
	switch	(action.type) {
		case 'FORECAST_PENDING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'FORECAST_REJECTED': {
			return {
				...state,
				isLoading: false,
				error: action.payload.data,
			};
		}
		case 'FORECAST_FULFILLED': {
			const normalizedData = forecastUtils.normalizeData(action.payload.data);
			const grouppedData = forecastUtils.groupDataByDate(normalizedData);

			return {
				error: null,
				isLoading: false,
				data: grouppedData,
			};
		}
		case 'FORECAST_IMPORT_CSV': {
			const grouppedData = forecastUtils.groupDataByDate(action.payload);

			return {
				error: null,
				isLoading: false,
				data: grouppedData,
			};
		}
		default: {
			return state;
		}
	}
}
