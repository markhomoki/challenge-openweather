// @flow

import * as React from 'react';

type Props = {
	children: string,
};

export default class FormFieldLabel extends React.PureComponent<Props> {

	render() {
		return <span className="form-field-label">{this.props.children}</span>;
	}

}
