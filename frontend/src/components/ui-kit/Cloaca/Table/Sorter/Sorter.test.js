import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import serializer from 'jest-emotion';
import { Table, Thead, Tbody, Row, Cell, Sorter } from '../';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(serializer);

const mockFn = jest.fn();

const props = {
    sequence: ['normal', 'asc', 'desc'],
    controlled: false,
    disabled: false,
    onClick: mockFn
};

const mountComponent = (props) =>
    mount(
        <Table>
            <Thead>
                <Row>
                    <Cell leftSlot={<Sorter {...props} />}>H1</Cell>
                </Row>
            </Thead>
            <Tbody>
                <Row>
                    <Cell>1</Cell>
                </Row>
                <Row>
                    <Cell>2</Cell>
                </Row>
            </Tbody>
        </Table>
    );

describe('<Sorter />', () => {
    let table, sorter;

    beforeEach(() => {
        table = mountComponent(props);

        sorter = table.find(Sorter);
    });

    afterEach(() => {
        table.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(sorter)).toMatchSnapshot();
    });

    test('should render correctly', () => {
        expect(sorter.prop('sequence')).toEqual(props.sequence);
        expect(sorter.prop('controlled')).toEqual(props.controlled);
        expect(sorter.prop('disabled')).toEqual(props.disabled);
    });

    test('should call onClick method on disabled', () => {
        table = mountComponent({ ...props, disabled: true });
        sorter = table.find(Sorter);

        sorter.simulate('click');
        expect(mockFn).not.toHaveBeenCalled();
    });

    test('should call onClick method', () => {
        sorter.simulate('click');
        expect(mockFn).toHaveBeenCalled();
    });

    test('should not sort', () => {
        table = mountComponent({ ...props, disabled: false, onClick: null, controlled: true });
        sorter = table.find(Sorter);

        const firstValue = table
            .find('ChildrenWrapper')
            .at(0)
            .text();

        sorter.simulate('click');

        expect(
            table
                .find('ChildrenWrapper')
                .at(0)
                .text()
        ).toEqual(firstValue);
    });
});
