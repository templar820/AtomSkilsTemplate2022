import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Notification from './';
import { colors } from 'lib-root/colors';

Enzyme.configure({ adapter: new Adapter() });

const mockFn = jest.fn();

const props = {
    preset: 'error',
    notificationColor: colors.errorAccent,
    icon: 'Archive',
    children: <div id="test7">Notification test7 content</div>,
    isFilled: false,
    size: 17,
    className: 'some-class',
    css: { fontSize: '18px' },
    ttl: 3001,
    onClick: mockFn
};

describe('<Notification />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Notification {...props} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    // test must be first, otherwise the snapshot size will be too large
    test('should match snapshot', () => {
        expect(toJson(wrapper.dive())).toMatchSnapshot();
    });

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Notification {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('should render correctly', () => {
        expect(wrapper.find('NotificationIcon')).toBeTruthy();
        expect(wrapper.find('div[id="test7"]')).toBeTruthy();
        expect(wrapper.find('Notification test7 content')).toBeTruthy();
        expect(wrapper.find('.some-class')).toBeTruthy();

        expect(wrapper.dive().props().onClick).toBeDefined();
        expect(typeof wrapper.dive().props().onClick).toBe('function');
        expect(wrapper.dive().props()).toHaveProperty('isFilled', props.isFilled);
        expect(wrapper.dive().props()).toHaveProperty('notificationColor', props.notificationColor);
        expect(wrapper.dive().props()).toHaveProperty('icon', props.icon);
        expect(wrapper.dive().props()).toHaveProperty('size', props.size);
        expect(wrapper.dive().props()).toHaveProperty('ttl', props.ttl);
        expect(wrapper.dive().props()).toHaveProperty('css', props.css);
    });

    test('should call onClick method', () => {
        wrapper.dive().simulate('click');
        expect(mockFn).toHaveBeenCalled();
    });
});
