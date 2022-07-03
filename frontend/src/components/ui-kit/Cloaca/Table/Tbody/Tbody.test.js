import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { matchers } from 'jest-emotion';
import serializer from 'jest-emotion';
import { Table, Tbody, Row } from '../';
import { testStyles } from 'lib-root/utils';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(matchers);
expect.addSnapshotSerializer(serializer);

const props = {
    css: { color: '#fff' }
};

describe('<Tbody />', () => {
    let table, tbody;

    beforeEach(() => {
        table = mount(
            <Table>
                <Tbody {...props}>
                    <Row></Row>
                </Tbody>
            </Table>
        );

        tbody = table.find(Tbody);
    });

    afterEach(() => {
        table.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(tbody)).toMatchSnapshot();
    });

    test('should render correctly', () => {
        testStyles(tbody, props.css);
    });
});
