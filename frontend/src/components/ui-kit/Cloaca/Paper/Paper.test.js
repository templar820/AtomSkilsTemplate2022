import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Paper from './';

Enzyme.configure({ adapter: new Adapter() });

const props = {
    size: 10,
    css: { background: 'brown' },
    className: 'toilet-paper',
    children: React.createElement(
        'legend',
        [],
        [
            <React.Fragment key="1">child</React.Fragment>,
            <React.Fragment key="2">
                <li>child</li>
            </React.Fragment>
        ]
    )
};

describe('<Paper />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Paper {...props} />);
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
        ReactDOM.render(<Paper {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('should render correctly', () => {
        expect(wrapper.prop('size')).toEqual(props.size);
        wrapper.setProps({ size: 'large' });
        expect(wrapper.prop('size')).toEqual('large');

        expect(wrapper.prop('css')).toMatchObject(props.css);
        expect(wrapper.hasClass(props.className)).toBeTruthy();
        expect(wrapper.contains(props.children)).toBeTruthy();
    });
});
