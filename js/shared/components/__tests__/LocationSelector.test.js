import React from 'react';
import renderer from 'react-test-renderer';
import LocationSelector from '../LocationSelector';

describe('LocationSelector', () => {
	it('renders correctly', () => {
		const tree = renderer.create(<LocationSelector />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('has different label', () => {
		const wrapper = mount(<LocationSelector label="Choose Location" />);
		expect(wrapper.find('.form-field-label').text()).toEqual('Choose Location');
	});

	it('defaults to London', () => {
		const wrapper = mount(<LocationSelector />);
		expect(wrapper.state().value).toEqual('London,GB');
	});

	it('changes state on select option', () => {
		const wrapper = mount(<LocationSelector />);
		expect(wrapper.state().value).toEqual('London,GB');
		wrapper.instance().handleChange({ currentTarget: { value: 'Barcelona,ES' } });
		expect(wrapper.state().value).toEqual('Barcelona,ES');
		wrapper.instance().handleChange({ currentTarget: { value: 'Rome,IT' } });
		expect(wrapper.state().value).toEqual('Rome,IT');
	});
});
