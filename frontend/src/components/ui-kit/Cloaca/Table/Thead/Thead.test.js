import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { matchers } from 'jest-emotion';
import serializer from 'jest-emotion';
import { Table, Thead, Row } from '../';
import { testStyles } from 'lib-root/utils';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(matchers);
expect.addSnapshotSerializer(serializer);

const props = {
    css: { color: '#fff' }
};

describe('<Thead />', () => {
    let table, thead;

    beforeEach(() => {
        table = mount(
            <Table>
                <Thead {...props}>
                    <Row></Row>
                </Thead>
            </Table>
        );

        thead = table.find(Thead);
    });

    afterEach(() => {
        table.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(thead)).toMatchSnapshot();
    });

    test('should render correctly', () => {
        testStyles(thead, props.css);
    });
});
