// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'app/store';
import App from 'app/App';

const app = document.getElementById('app');

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), app);
