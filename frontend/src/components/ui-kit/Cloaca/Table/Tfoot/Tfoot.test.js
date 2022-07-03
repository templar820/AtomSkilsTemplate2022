import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { matchers } from 'jest-emotion';
import serializer from 'jest-emotion';
import { Table, Tfoot, Row } from '../';
import { testStyles } from 'lib-root/utils';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(matchers);
expect.addSnapshotSerializer(serializer);

const props = {
    css: { color: '#fff' }
};

describe('<Tfoot />', () => {
    let table, tfoot;

    beforeEach(() => {
        table = mount(
            <Table>
                <Tfoot {...props}>
                    <Row></Row>
                </Tfoot>
            </Table>
        );

        tfoot = table.find(Tfoot);
    });

    afterEach(() => {
        table.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(tfoot)).toMatchSnapshot();
    });

    test('should render correctly', () => {
        testStyles(tfoot, props.css);
    });
});
