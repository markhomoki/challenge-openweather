import React from 'react';
import renderer from 'react-test-renderer';
import CSVUploader from '../CSVUploader';

describe('CSVUploader', () => {
	it('renders correctly', () => {
		const tree = renderer.create(<CSVUploader />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('has different label', () => {
		const wrapper = mount(<CSVUploader label="Choose File" />);
		expect(wrapper.find('.form-field-label').text()).toEqual('Choose File');
	});

});
