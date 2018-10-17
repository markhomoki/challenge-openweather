// @flow

export type ForecastDataRowType = {
	date: string,
	times: {[string]: {
		time: string,
		temp: number,
		celsius: number,
	}},
};

export type ForecastDateItemType = {|
	date: string,
	temp: number,
|};

export type ForecastCollectionType = {|
	data: Array<ForecastDataRowType>,
	error: any,
	isLoading: boolean,
|};

export type OpenweatherResponseData = {
	city: {|
		id: number,
		name: string,
	|},
	list: Array<{|
		dt_txt: string,
		main: {|
			temp: number,
		|},
	|}>,
};
