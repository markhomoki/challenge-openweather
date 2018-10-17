// @flow

import * as React from 'react';
import FormFieldLabel from './FormFieldLabel';

type Props = {
	label?: string,
	onImport: Function,
};

type State = {
	importData: Array<{|date: string, temp: string|}>,
};

export default class CSVUploader extends React.PureComponent<Props, State> {

	static defaultProps = {
		label: 'Select File',
	}

	fileReader: FileReader;

	state = {
		importData: [],
	};

	handleFileRead = () => {
		const content = this.fileReader.result;

		if (!content) {
			return;
		}

		const rows = content.toString().split('\n');
		const res = [];
		for (let i = 0; i < rows.length; i++) {
			const r = rows[i];

			if (r) {
				const cols = r.split(',');

				// Basic check to make sure CSV has the right number of cols and not empty
				if (cols.length === 2 && cols[0] && cols[1]) {
					res.push({
						date: cols[0],
						temp: cols[1],
					});
				}
			}
		}

		this.setState({ importData: res });
	}

	handleFileSelect = (event: SyntheticEvent<*>) => {
		const file = event.target.files[0];

		// Check if file selected
		if (file) {
			this.fileReader = new FileReader();
			this.fileReader.onloadend = this.handleFileRead;
			this.fileReader.readAsText(file);
		}
	}

	import = () => {
		if (this.state.importData.length > 0) {
			this.props.onImport(this.state.importData);
		}
	}

	render() {
		const { label } = this.props;

		return (
			<div className="form-field-file-picker">
				{!!label && <FormFieldLabel>{label}</FormFieldLabel>}
				<input
					type="file"
					accept=".csv"
					onChange={this.handleFileSelect}
				/>
				<button className="button" type="button" onClick={this.import}>Import</button>
			</div>
		);
	}

}
