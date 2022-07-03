import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import TopLine from './units/TopLine';
import TextAndCheckbox from './units/TextAndCheckbox';
import Icon from './units/Icon';
import { StyledTopLine } from './units/units';

Enzyme.configure({ adapter: new Adapter() });

const onClickFn = jest.fn();
const onHoverFn = jest.fn();

const props = {
    handleExpanding: () => {},
    topLineStyles: { margin: '10px' },
    selection: true,
    parentChecked: true,
    title: 'title',
    nestingLevel: 1,
    onClick: onClickFn,
    onHover: onHoverFn
};

// TODO: need to write all tests.
describe('<TopLine />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<TopLine {...props} />);
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
        ReactDOM.render(<TopLine {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('should render correctly', () => {
        const icon = wrapper.find(Icon);
        expect(icon.prop('handleExpanding')).toEqual(props.handleExpanding);
        const styled = wrapper.find(StyledTopLine);
        expect(styled.prop('topLineStyles')).toEqual(props.topLineStyles);
        expect(styled.prop('selection')).toEqual(props.selection);
        expect(styled.prop('parentChecked')).toEqual(props.parentChecked);
        const textAndCheckbox = wrapper.find(TextAndCheckbox);
        expect(textAndCheckbox.prop('title')).toEqual(props.title);
        expect(styled.prop('nestingLevel')).toEqual(props.nestingLevel);
    });

    test('should call onClick method', () => {
        wrapper.simulate('click');
        expect(onClickFn).toHaveBeenCalled();
    });

    test('should call onHover method', () => {
        wrapper.simulate('mouseEnter');
        expect(onHoverFn).toHaveBeenCalledWith(true);
        wrapper.simulate('mouseLeave');
        expect(onHoverFn).toHaveBeenLastCalledWith(false);
    });
});
