// @flow

import api from 'app/utils/api';
import type { Dispatch, ImportDataType } from 'app/types';

export function importCSV(data: ImportDataType) {
	return { type: 'FORECAST_IMPORT_CSV', payload: data };
}

// Custom Thunk Middleware
type FetchDataPayload = {|
	type: string,
	url: string,
|};

export const rejectData = (payload: FetchDataPayload, res: Object) => {
	return {
		type: `${payload.type}_REJECTED`,
		payload: res,
	};
};

export const requestData = (payload: FetchDataPayload) => {
	return {
		type: `${payload.type}_PENDING`,
	};
};

export const receiveData = (payload: FetchDataPayload, res: Object) => {
	return {
		payload: res,
		type: `${payload.type}_FULFILLED`,
	};
};

export const fetchData = (payload: FetchDataPayload) => (dispatch: Dispatch) => {
	dispatch(requestData(payload));
	return api.get(payload.url)
		.then((res) => {
			if (res.status !== 200) {
				console.log('err', res);
				return;
			}
			dispatch(receiveData(payload, res));
		});
};
