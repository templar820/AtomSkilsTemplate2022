import React from 'react';
import ReactDOM from 'react-dom';
import serializer from 'jest-emotion';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Badge from './';
import { StyledInner, StyledBadgeLabel, StyledOuter } from './units';

expect.addSnapshotSerializer(serializer);

Enzyme.configure({ adapter: new Adapter() });

const props = {
    children: <div id="child">children</div>,
    badgePositionX: 'left',
    color: 'textCollor',
    bgColor: 'badgeColor',
    text: '99+',
    icon: 'Information',
    outerStyle: { marginLeft: '50px' },
    alignItems: 'right',
    isOutlined: true,
    x: 'right',
    badgePositionY: 'middle',
    y: 'middle',
    extendStyle: { marginLeft: '50px' }
};

describe('<Badge />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Badge {...props} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Badge />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('should render correctly', () => {
        const label = wrapper.find(StyledBadgeLabel);
        expect(wrapper.contains(props.children)).toBeTruthy();
        expect(wrapper.find('#child').length).toBe(1);
        expect(wrapper.props()).toHaveProperty('badgePositionX', props.badgePositionX);
        expect(label.prop('badgePositionX')).toEqual(props.badgePositionX);
        expect(wrapper.props()).toHaveProperty('color', props.color);
        expect(label.prop('color')).toEqual(props.color);
        expect(wrapper.props()).toHaveProperty('bgColor', props.bgColor);
        expect(label.prop('bgColor')).toEqual(props.bgColor);
        expect(wrapper.props()).toHaveProperty('text', props.text);
        expect(label.prop('text')).toEqual(props.text);
        expect(wrapper.props()).toHaveProperty('icon', props.icon);
        expect(label.prop('icon')).toEqual(props.icon);
        expect(wrapper.props()).toHaveProperty('outerStyle', props.outerStyle);
        expect(wrapper.find(StyledOuter).prop('outerStyle')).toEqual(props.outerStyle);
        expect(wrapper.props()).toHaveProperty('alignItems', props.alignItems);
        expect(wrapper.find(StyledInner).prop('alignItems')).toEqual(props.alignItems);
        expect(wrapper.children()).toHaveLength(React.Children.count(props.children));
        expect(wrapper.props()).toHaveProperty('isOutlined', props.isOutlined);
        expect(label.prop('isOutlined')).toEqual(props.isOutlined);
        expect(wrapper.props()).toHaveProperty('x', props.x);
        expect(label.prop('x')).toEqual(props.x);
        expect(wrapper.props()).toHaveProperty('badgePositionY', props.badgePositionY);
        expect(label.prop('badgePositionY')).toEqual(props.badgePositionY);
        expect(wrapper.props()).toHaveProperty('y', props.y);
        expect(label.prop('y')).toEqual(props.y);
        expect(wrapper.props()).toHaveProperty('extendStyle', props.extendStyle);
        expect(label.prop('extendStyle')).toEqual(props.extendStyle);
    });
});
