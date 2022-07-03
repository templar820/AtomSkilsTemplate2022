import React from 'react';

import serializer from 'jest-emotion';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Chips from './';

expect.addSnapshotSerializer(serializer);

Enzyme.configure({ adapter: new Adapter() });

const funcMock = jest.fn();

const props = {
    onClick: () => funcMock('onClick'),
    onClose: () => funcMock('onClose'),
    onCheckChange: () => funcMock('onCheckChange'),
    children: <div id="children">Chips children</div>,
    color: '#000',
    css: { margin: '18px' },
    style: { background: '#fff', padding: 10 },
    colorScheme: 'gray',
    radius: '15px',
    fontSize: '15px'
};

describe('<Chips />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Chips {...props} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('should render correctly', () => {
        expect(wrapper.find('div[id="children"]')).toBeTruthy();
        expect(wrapper.find('Chips children')).toBeTruthy();

        expect(wrapper.props()).toHaveProperty('fontSize', props.fontSize);
        expect(wrapper.props()).toHaveProperty('radius', props.radius);
        expect(wrapper.props()).toHaveProperty('color', props.color);
        expect(wrapper.props()).toHaveProperty('colorScheme', props.colorScheme);
        expect(wrapper.props()).toHaveProperty('css', props.css);
    });

    test('should component disable', () => {
        wrapper.setProps({ disabled: true });
        wrapper.update();
        wrapper.simulate('click');
        expect(funcMock).not.toHaveBeenCalled();
    });

    test('should call onClick function', () => {
        wrapper.simulate('click');
        expect(funcMock).toHaveBeenCalledWith('onClick');
    });

    test('should call onChange function', () => {
        wrapper.simulate('change', { target: { value: true } });
        expect(funcMock).toHaveBeenCalledWith('onCheckChange');
    });

    test('should have onClose function', () => {
        wrapper.find('svg').simulate('click');
        expect(funcMock).toHaveBeenCalledWith('onClose');
    });
});
