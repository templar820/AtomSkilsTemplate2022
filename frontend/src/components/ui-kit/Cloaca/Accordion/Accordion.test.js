import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import { Accordion, Collapse } from './';

Enzyme.configure({ adapter: new Adapter() });

const props = {
    isOpen: true,
    selectedItem: 1,
    closeAll: false
};

describe('<Accordion />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Accordion {...props}>
                <Collapse />
                <Collapse />
            </Accordion>
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Accordion {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('should render correctly', () => {
        expect(props).toHaveProperty('isOpen', props.isOpen);
        expect(props).toHaveProperty('selectedItem', props.selectedItem);
        expect(props).toHaveProperty('children', props.children);
        expect(props).toHaveProperty('closeAll', props.closeAll);
        expect(wrapper.prop('size')).toEqual(props.size);
    });

    test('should component expand', () => {
        expect(
            wrapper
                .find('withColors(Collapse)')
                .at(props.selectedItem)
                .prop('expanded')
        ).toBeTruthy();
    });

    test('should component onClick expand', () => {
        wrapper
            .find('withColors(Collapse)')
            .at(0)
            .simulate('click');
        expect(
            wrapper
                .find('withColors(Collapse)')
                .at(props.selectedItem)
                .prop('expanded')
        ).not.toBeTruthy();
    });
});
