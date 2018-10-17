// @flow

import { combineReducers } from 'redux';

// Reducers
import forecast from 'app/containers/forecast/reducer';

const appReducer = combineReducers({
	forecast,
});

export default appReducer;
