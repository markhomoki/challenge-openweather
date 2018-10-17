import React from 'react';
import View from 'app/containers/forecast/View';

export default class App extends React.PureComponent<{}> {

	render() {
		return (
			<div className="site">
				<View />
			</div>
		);
	}

}
