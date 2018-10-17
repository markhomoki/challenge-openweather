import React from 'react';
import renderer from 'react-test-renderer';
import store from 'app/store';
import View from '../View';

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

describe('View', () => {

	let wrapper;

	beforeEach(() => {
		wrapper = shallow(
			<View store={store} />
		);
	});

	it('renders correctly', () => {
		const tree = renderer.create(<View store={store} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('shows loader until fetching then hides loader', async () => {
		expect(wrapper.dive().contains(<p className="loader">Loading...</p>)).toEqual(true);
		wrapper.dive().instance().fetchData();
		await sleep(1000);
		expect(wrapper.dive().contains(<p className="loader">Loading...</p>)).toEqual(false);
	});
});
