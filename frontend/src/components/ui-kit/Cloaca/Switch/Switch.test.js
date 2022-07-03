import React from 'react';

import serializer from 'jest-emotion';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Switch from './';

expect.addSnapshotSerializer(serializer);

Enzyme.configure({ adapter: new Adapter() });

const mockFn = jest.fn();

const colorSc = {
    main: 'blue',
    inactive: 'red',
    border: 'black',
    inactiveBorder: 'black',
    additional: 'lightgrey'
};

const checkedIconProp = <div id="checkedIco">Styled ico</div>;
const uncheckedIconProp = <div id="uncheckedIco">Styled ico</div>;

const props = {
    disabled: false,
    checked: false,
    isControlled: true,
    checkedIcon: checkedIconProp,
    uncheckedIcon: uncheckedIconProp,
    iconsType: 'iconic',
    onCheckChange: mockFn
};

describe('<Switch />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Switch {...props} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('should should render correctly', () => {
        expect(typeof wrapper.props().onCheckChange).toBe('function');

        expect(wrapper.find('svg')).toBeTruthy();

        expect(wrapper.props()).toHaveProperty('checked', props.checked);
        expect(wrapper.props()).toHaveProperty('disabled', props.disabled);
        expect(wrapper.props()).toHaveProperty('isControlled', props.isControlled);
        expect(wrapper.props()).toHaveProperty('wrapperStyle', props.wrapperStyle);
        expect(wrapper.props()).toHaveProperty('thumbStyle', props.thumbStyle);
        expect(wrapper.props()).toHaveProperty('boxStyle', props.boxStyle);
        expect(wrapper.props()).toHaveProperty('iconsType', props.iconsType);
        expect(wrapper.props()).toHaveProperty('checkedIcon', props.checkedIcon);
        expect(wrapper.props()).toHaveProperty('uncheckedIcon', props.uncheckedIcon);
        expect(wrapper.props()).toHaveProperty('onCheckChange', props.onCheckChange);
    });

    test('should input checked', () => {
        expect(wrapper.find('input')).not.toBeChecked();
        wrapper.setProps({ checked: true });
        expect(wrapper.find('input')).toBeChecked();
    });

    test('should change have another colors', () => {
        expect(wrapper.prop('colorSchemeExtra')).toEqual({});
        wrapper.setProps({ colorSchemeExtra: colorSc });
        expect(wrapper.prop('colorSchemeExtra')).not.toEqual({});
    });

    test('should have checkedIcon', () => {
        expect(wrapper.find('div[id="checkedIco"]')).toBeTruthy();
        expect(wrapper.find('div[id="uncheckedIco"]')).toBeTruthy();
    });

    test('should call onCheckChange function', () => {
        wrapper.find('input').simulate('change', { target: { value: true } });
        expect(mockFn).toHaveBeenCalled();
    });

    test('should have numeric ', () => {
        wrapper.setProps({ iconsType: 'numeric' });
        wrapper.update();
        expect(wrapper.find('span>span')).toBeTruthy();
    });
});
