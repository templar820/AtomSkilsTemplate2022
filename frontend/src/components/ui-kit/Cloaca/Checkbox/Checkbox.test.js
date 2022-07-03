import React from 'react';
import ReactDOM from 'react-dom';
// needs for serialize emotion classes to the snapshot
import serializer from 'jest-emotion';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Checkbox from './';

expect.addSnapshotSerializer(serializer);

Enzyme.configure({ adapter: new Adapter() });

const myMockFn = jest.fn();

const props = {
    checked: 'indeterminate',
    children: <div>Checkbox label</div>,
    name: 'input-name',
    size: 16,
    className: 'some-class',
    onCheckChange: myMockFn,
    disabled: true,
    css: { fontSize: '18px' },
    squareStyle: { width: '18px' }
};

describe('<Checkbox />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Checkbox {...props} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    // test must be first, otherwise the snapshot size will be too large
    test('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Checkbox />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('should render correctly', () => {
        expect(wrapper.find('input').length).toBe(1);

        expect(wrapper.find('input')).toBeDisabled();
        wrapper.setProps({ disabled: false });
        expect(wrapper.find('input')).not.toBeDisabled();

        expect(wrapper.find('input')).not.toBeChecked();
        wrapper.setProps({ checked: true });
        expect(wrapper.find('input')).toBeChecked();
    });

    test('should change state on mouse events', () => {
        expect(wrapper.state().isHovered).toBe(false);
        wrapper.find('label').simulate('mouseEnter');
        expect(wrapper.state().isHovered).toBe(true);
        wrapper.find('label').simulate('mouseLeave');
        expect(wrapper.state().isHovered).toBe(false);
    });

    test('should call onCheckChange method', () => {
        wrapper.find('input').simulate('change', { target: { value: true } });

        expect(myMockFn).toHaveBeenCalled();
    });
});
