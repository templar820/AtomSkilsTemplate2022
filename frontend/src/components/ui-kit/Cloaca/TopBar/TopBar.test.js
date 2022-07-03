import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import TopBar from './';

import { colors } from 'lib-root/colors';

import config from './test-config';

Enzyme.configure({ adapter: new Adapter() });

const props = {
    leftItems: config.leftItems,
    leftMenuOverTitle: 'See more...',
    occurrence: 'It',
    rightItems: config.rightItems,
    style: { background: colors.errorAccent },
    css: { fontSize: '18px' }
};

describe('<TopBar />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<TopBar {...props} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    // test must be first, otherwise the snapshot size will be too large
    test('should match snapshot', () => {
        expect(toJson(wrapper.dive().dive())).toMatchSnapshot();
    });

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TopBar {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('should render correctly', () => {
        expect(
            wrapper
                .dive()
                .dive()
                .find('StyledLeftMenuItem').length +
                wrapper
                    .dive()
                    .dive()
                    .find('StyledShowMoreMenuItem').length +
                wrapper
                    .dive()
                    .dive()
                    .find('StyledRightMenuItem').length
        ).toBe(7); // 7 - number of menu items

        /* Checks first menu item */
        const dropdownItems = wrapper
            .dive()
            .dive()
            .find('StyledLeftMenuItem')
            .first()
            .find('withColors(DropdownItem)');

        expect(dropdownItems.length).toBe(1);
        expect(dropdownItems.props()).toHaveProperty('occurrence', props.occurrence);
    });
});
