import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import serializer from 'jest-emotion';
import { Table, Thead, Tbody, Row, Cell, ColFilter } from '../';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(serializer);

const props = {
    triggerElement: <div className="newTrigger"></div>,
    closeOnOutside: true
};

describe('<ColFilter />', () => {
    let table, colFilter;

    beforeEach(() => {
        table = mount(
            <Table>
                <Thead>
                    <Row>
                        <Cell>H1</Cell>
                        <ColFilter {...props}></ColFilter>
                    </Row>
                </Thead>
                <Tbody>
                    <Row>
                        <Cell>text</Cell>
                    </Row>
                </Tbody>
            </Table>
        );

        colFilter = table.find(ColFilter);
    });

    afterEach(() => {
        table.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(colFilter)).toMatchSnapshot();
    });

    test('should render correctly', () => {
        expect(colFilter.prop('triggerElement')).toEqual(props.triggerElement);
        expect(colFilter.prop('closeOnOutside')).toEqual(props.closeOnOutside);
        expect(colFilter.find('.newTrigger')).toHaveLength(1);
    });

    test('should show filter', () => {
        colFilter.find('StyledTrigger').simulate('click');
        expect(table.find('Wrap')).toHaveLength(1);
    });
});
