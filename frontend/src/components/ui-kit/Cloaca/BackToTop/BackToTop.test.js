import React from 'react';
import ReactDOM from 'react-dom';
import serializer from 'jest-emotion';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import BackToTop from './';

expect.addSnapshotSerializer(serializer);

Enzyme.configure({ adapter: new Adapter() });

const myMockFn = jest.fn();

const props = {
    onClick: () => myMockFn('onClick'),
    cancelAnimation: false,
    direction: 'toBottom',
    animationDuration: 2000,
    scrollTo: 0,
    easing: 'easeOutSine',
    showAt: 0,
    showOnScroll: false,
    style: {
        position: 'fixed',
        left: 10,
        top: 100
    }
};

describe('<BackToTop />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<BackToTop {...props} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BackToTop />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('should render correctly', () => {
        expect(wrapper.find('button').length).toBe(1);
        expect(wrapper.props()).toHaveProperty('style', props.style);
    });

    test('should call onClick function', () => {
        wrapper.simulate('click');
        expect(myMockFn).toHaveBeenCalledWith('onClick');
    });
});
