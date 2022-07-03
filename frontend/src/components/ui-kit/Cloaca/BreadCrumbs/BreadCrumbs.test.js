import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { matchers } from 'jest-emotion';
import BreadCrumbs from './';
import { testStyles } from 'lib-root/utils';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(matchers);

const mockFn = jest.fn();

const props = {
    size: 'sm',
    items: [{ link: '#', title: '1' }, { title: '2' }, { link: '#', title: '2' }],
    lastItemColor: '#000',
    onLinkClick: mockFn,
    wrapStyle: { background: '#fff' },
    itemStyle: { background: '#000' },
    iconStyle: { background: '#eee' },
    width: '100px',
    height: '90px'
};

const Welcome = ({ link, title }) => <a href={link}>{title}</a>;

describe('<BreadCrumbs />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<BreadCrumbs {...props} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BreadCrumbs {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('should render correctly', () => {
        expect(wrapper.props()).toHaveProperty('size', props.size);
        expect(wrapper).toHaveStyleRule('font-size', '16px');

        expect(wrapper.props()).toHaveProperty('items', props.items);
        expect(wrapper.find('div').children()).toHaveLength(props.items.length);

        expect(wrapper.props()).toHaveProperty('wrapStyle', props.wrapStyle);
        testStyles(wrapper, props.wrapStyle);

        expect(wrapper.props()).toHaveProperty('itemStyle', props.itemStyle);
        testStyles(wrapper.find('StyledItem').at(0), props.itemStyle);

        expect(wrapper.props()).toHaveProperty('iconStyle', props.iconStyle);
        testStyles(wrapper.find('withColors(InlineIcons)').at(0), props.iconStyle);

        expect(wrapper.props()).toHaveProperty('width', props.width);
        expect(wrapper).toHaveStyleRule('width', props.width);

        expect(wrapper.props()).toHaveProperty('height', props.height);
        expect(wrapper).toHaveStyleRule('height', props.height);
    });

    test('should call onClick method', () => {
        wrapper
            .find('StyledLink')
            .at(0)
            .simulate('click');
        expect(mockFn).toHaveBeenCalled();
    });

    test('should current lastItemColor', () => {
        expect(
            wrapper
                .find('withColors(InlineIcons)')
                .at(1)
                .prop('color')
        ).toEqual(props.lastItemColor);
    });

    test('should render disabled links', () => {
        expect(
            wrapper
                .find('StyledLink')
                .at(1)
                .prop('disabled')
        ).toBeTruthy();
    });

    test('should render correctly with linkComponent', () => {
        wrapper.setProps({
            linkComponent: <Welcome />
        });
        expect(wrapper.find('Welcome')).toHaveLength(props.items.length - 1);
    });

    test('should call onClick method with linkComponent', () => {
        wrapper.setProps({
            linkComponent: <Welcome />
        });
        wrapper
            .find('Welcome')
            .at(0)
            .simulate('click');
        expect(mockFn).toHaveBeenCalled();
    });
});
