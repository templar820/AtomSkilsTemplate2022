import React from 'react';

import serializer from 'jest-emotion';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import RadioButton from './';

expect.addSnapshotSerializer(serializer);

Enzyme.configure({ adapter: new Adapter() });

const mockFn = jest.fn();

const props = {
    disabled: false,
    checked: false,
    size: '16px',
    style: {},
    css: {},
    children: <div id="test8">RadioButton children</div>,
    className: 'test-className',
    onCheckChange: mockFn,
    propId: 11,
    name: 'test name'
};

describe('<RadioButton />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<RadioButton {...props} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('should render children and name', () => {
        expect(wrapper.find('test name')).toBeTruthy();
        expect(wrapper.find('.test-className')).toBeTruthy();
        expect(wrapper.find('div[id="test8"]')).toBeTruthy();
        expect(wrapper.find('RadioButton children')).toBeTruthy();
    });

    test('should change disabled an checked props', () => {
        expect(wrapper.find('input')).not.toBeDisabled();
        wrapper.setProps({ disabled: true });
        expect(wrapper.find('input')).toBeDisabled();

        expect(wrapper.find('input')).not.toBeChecked();
        wrapper.setProps({ checked: true });
        expect(wrapper.find('input')).toBeChecked();
    });

    test('should call onCheckChange method', () => {
        wrapper.find('input').simulate('change', { target: { value: true } });

        expect(mockFn).toHaveBeenCalled();
    });

    test('should change state on mouse events', () => {
        expect(wrapper.find('CheckboxSvg').prop('isHovered')).toEqual(false);
        wrapper.find('label').simulate('mouseEnter');
        expect(wrapper.find('CheckboxSvg').prop('isHovered')).toEqual(true);
        wrapper.find('label').simulate('mouseLeave');
        expect(wrapper.find('CheckboxSvg').prop('isHovered')).toEqual(false);
    });
});
