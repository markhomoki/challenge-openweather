// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { fetchData, importCSV } from 'app/actions';
import type { Dispatch, ImportDataType } from 'app/types';
import { CSVUploader, LocationSelector } from 'app/components';
import type { ForecastCollectionType } from './types';

type Props = {
	dispatch: Dispatch,
	forecast: ForecastCollectionType,
};

type State = {
	currentLocation: string,
};

@connect((state) => {
	return {
		forecast: state.forecast,
	};
})
export default class View extends React.PureComponent<Props, State> {

	times: Array<string> = [
		'00:00',
		'03:00',
		'06:00',
		'09:00',
		'12:00',
		'15:00',
		'18:00',
		'21:00',
	];

	state = {
		currentLocation: 'London,GB',
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		this.props.dispatch(fetchData({
			type: 'FORECAST',
			url: `/forecast?q=${this.state.currentLocation}`,
		}));
	}

	handleImport = (data: ImportDataType) => {
		this.props.dispatch(importCSV(data));
	}

	handleLocationChange = (currentLocation: string) => {
		this.setState({ currentLocation }, this.fetchData);
	}

	renderContent = () => {
		const {
			forecast,
		} = this.props;

		if (forecast.isLoading) {
			return <p className="loader">Loading...</p>;
		}

		return (
			<table>
				<thead>
					<tr>
						<th />
						{this.times.map(time => <th key={time}>{time}</th>)}
					</tr>
				</thead>
				<tbody>
					{forecast.data.map((r) => {
						const dates = r.date.split('-');
						return (
							<tr key={r.date}>
								<th>
									<span className="hide-on-mobile">{dates[0]}-</span>
									<span>{dates[1]}-</span>
									<span>{dates[2]}</span>
								</th>
								{this.times.map((time) => {
									const temp = r.times[time] ? r.times[time].celsius : null;
									return <td key={time}>{temp ? <span>{temp}<span className="hide-on-mobile"> °C</span></span> : ''}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}

	render() {

		return (
			<div className="site-inner">
				<div className="forecast-actions">
					<div className="select-city-wrapper">
						<LocationSelector onFetch={this.handleLocationChange} />
					</div>
					<span className="or">OR</span>
					<div className="csv-import-wrapper">
						<CSVUploader onImport={this.handleImport} />
					</div>
				</div>

				<h1>Weather Forecast</h1>
				{this.renderContent()}
			</div>
		);
	}

}
