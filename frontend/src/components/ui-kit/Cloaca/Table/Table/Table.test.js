import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import serializer from 'jest-emotion';
import { Table, Thead, Row, Cell } from '../';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(serializer);

const props = {
    sortersOrder: 'ltr',
    entriesOnDisplay: 15,
    sorters: [],
    filters: [],
    hoveringRows: true,
    defaultResizable: true,
    minCellWidths: [175, 225, 225, 175],
    maxCellWidths: [],
    fixedHeader: true,
    fixedFooter: true,
    fixedFirstCol: true,
    fixedLastCol: true,
    showHorizontalScrollShadows: true
};

describe('<Table />', () => {
    let table;

    beforeEach(() => {
        table = mount(
            <Table {...props}>
                <Thead>
                    <Row>
                        <Cell {...props}>H1</Cell>
                    </Row>
                </Thead>
            </Table>
        );
    });

    afterEach(() => {
        table.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(table)).toMatchSnapshot();
    });

    test('should render correctly', () => {
        expect(table.prop('sortersOrder')).toEqual(props.sortersOrder);
        expect(table.prop('entriesOnDisplay')).toEqual(props.entriesOnDisplay);
        expect(table.prop('sorters')).toEqual(props.sorters);
        expect(table.prop('filters')).toEqual(props.filters);
        expect(table.prop('hoveringRows')).toEqual(props.hoveringRows);
        expect(table.prop('defaultResizable')).toEqual(props.defaultResizable);
        expect(table.prop('minCellWidths')).toEqual(props.minCellWidths);
        expect(table.prop('maxCellWidths')).toEqual(props.maxCellWidths);
        expect(table.prop('fixedHeader')).toEqual(props.fixedHeader);
        expect(table.prop('fixedFooter')).toEqual(props.fixedFooter);
        expect(table.prop('fixedFirstCol')).toEqual(props.fixedFirstCol);
        expect(table.prop('fixedLastCol')).toEqual(props.fixedLastCol);
        expect(table.prop('showHorizontalScrollShadows')).toEqual(props.showHorizontalScrollShadows);
    });
});
