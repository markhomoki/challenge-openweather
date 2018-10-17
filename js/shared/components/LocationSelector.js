// @flow

import * as React from 'react';
import FormFieldLabel from './FormFieldLabel';

type Props = {
	label?: string,
	onFetch: Function,
};

type State = {
	value: string,
};

export default class LocationSelector extends React.PureComponent<Props, State> {

	static defaultProps = {
		label: 'Select Location',
	}

	options: Array<{|value: string, label: string|}> = [
		{ value: 'London,GB', label: 'London' },
		{ value: 'Paris,FR', label: 'Paris' },
		{ value: 'Barcelona,ES', label: 'Barcelona' },
		{ value: 'Rome,IT', label: 'Rome' },
	];

	state = {
		value: 'London,GB',
	};

	handleFetch = () => {
		this.props.onFetch(this.state.value);
	}

	handleChange = (event: SyntheticEvent<*>) => {
		const { value } = event.currentTarget;
		this.setState({ value });
	}

	render() {
		const {
			label,
		} = this.props;

		return (
			<div className="form-field-select">
				{!!label && <FormFieldLabel>{label}</FormFieldLabel>}
				<select onChange={this.handleChange} value={this.state.value}>
					{this.options.map((o) => {
						return <option key={o.value} value={o.value}>{o.label}</option>;
					})}
				</select>
				<button className="button" type="button" onClick={this.handleFetch}>Fetch</button>
			</div>
		);
	}

}
