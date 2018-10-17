import React from 'react';
import renderer from 'react-test-renderer';
import FormFieldLabel from '../FormFieldLabel';

describe('FormFieldLabel', () => {
	it('renders correctly', () => {
		const tree = renderer.create(<FormFieldLabel />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
