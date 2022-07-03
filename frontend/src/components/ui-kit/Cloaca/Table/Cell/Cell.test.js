import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { matchers } from 'jest-emotion';
import serializer from 'jest-emotion';
import { Table, Thead, Row, Cell } from '../';
import { testStyles } from 'lib-root/utils';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(matchers);
expect.addSnapshotSerializer(serializer);

const props = {
    css: { background: '#fff' },
    filtersValue: 0,
    showInColFilter: true,
    leftSlot: <span className="left"></span>,
    rightSlot: <span className="right"></span>
};

describe('<Cell />', () => {
    let table, cell;

    beforeEach(() => {
        table = mount(
            <Table>
                <Thead>
                    <Row>
                        <Cell {...props}>H1</Cell>
                    </Row>
                </Thead>
            </Table>
        );

        cell = table.find(Cell);
    });

    afterEach(() => {
        table.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(cell)).toMatchSnapshot();
    });

    test('should render correctly', () => {
        testStyles(cell, props.css);
        expect(cell.prop('filtersValue')).toEqual(props.filtersValue);
        expect(cell.prop('showInColFilter')).toEqual(props.showInColFilter);
        expect(cell.find('.left')).toHaveLength(1);
        expect(cell.find('.right')).toHaveLength(1);
    });
});
