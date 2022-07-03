import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { matchers } from 'jest-emotion';
import serializer from 'jest-emotion';
import { Table, Thead, Tbody, Row, Cell, Filter } from '../';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(matchers);
expect.addSnapshotSerializer(serializer);

const props = {
    showDropdown: true,
    filterOnType: true,
    filterOnOptionPick: true,
    revertOnCancel: true,
    closeOnCancel: true,
    closeOnOk: true,
    filterType: 'includes',
    iconWidth: '16px',
    iconHeight: '16px'
};

describe('<Filter />', () => {
    let table, filter;

    beforeEach(() => {
        table = mount(
            <Table>
                <Thead>
                    <Row>
                        <Cell>H1</Cell>
                        <Cell>H2</Cell>
                        <Cell>
                            <Filter {...props} />
                        </Cell>
                    </Row>
                </Thead>
                <Tbody>
                    <Row>
                        <Cell>text1</Cell>
                        <Cell>text2</Cell>
                        <Cell />
                    </Row>
                    <Row>
                        <Cell>text1</Cell>
                        <Cell>text2</Cell>
                        <Cell />
                    </Row>
                </Tbody>
            </Table>
        );

        filter = table.find(Filter);
    });

    afterEach(() => {
        table.unmount();
    });

    test('should match snapshot', () => {
        expect(toJson(filter)).toMatchSnapshot();
    });

    test('should render correctly', () => {
        expect(filter.prop('showDropdown')).toEqual(props.showDropdown);
        expect(filter.prop('filterOnType')).toEqual(props.filterOnType);
        expect(filter.prop('filterOnOptionPick')).toEqual(props.filterOnOptionPick);
        expect(filter.prop('revertOnCancel')).toEqual(props.revertOnCancel);
        expect(filter.prop('closeOnCancel')).toEqual(props.closeOnCancel);
        expect(filter.prop('closeOnOk')).toEqual(props.closeOnOk);
        expect(filter.prop('filterType')).toEqual(props.filterType);

        expect(filter.prop('iconWidth')).toEqual(props.iconWidth);
        expect(filter.find('Styled(svg) svg')).toHaveStyleRule('width', props.iconWidth);

        expect(filter.prop('iconHeight')).toEqual(props.iconHeight);
        expect(filter.find('Styled(svg) svg')).toHaveStyleRule('height', props.iconHeight);
    });

    test('should open filter', () => {
        filter.find('StyledTrigger').simulate('click');
        expect(table.find('Wrap')).toHaveLength(1);
    });
});
