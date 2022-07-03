import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import { ColorsContext } from 'lib-root/colors';
import { setClassName } from 'lib-root/utils/styleMixins';

import Row from '../Row';
import Cell from '../Cell';
import { EmptyStates } from 'lib-root/components/utils';
import { noDataMessageStyles } from './units';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

import { OffsetContext } from '../utils';

const StyledTbody = styled.tbody`
    &:after {
        content: '';
        display: table-row;
        height: 100%;
    }
    ${({ _css, ...restProps }) => applyEmotionStyle(_css, restProps)};
`;

const Tbody = React.memo(
    React.forwardRef(({ children, css: _css, className, noDataProps, showNoData, ...restProps }, ref) => {
        const colors = useContext(ColorsContext);
        const [startEntry, entriesOnDisplay, offset] = useContext(OffsetContext);

        if (!children.length && showNoData) {
            children.push(
                <Row key="noData" hoveringRows={false}>
                    <Cell colSpan={restProps['columnsCount']} css={noDataMessageStyles}>
                        <EmptyStates {...noDataProps} />
                    </Cell>
                </Row>
            );
        }

        const childrenFilteredByCount = useMemo(() => {
            const offset = startEntry ? startEntry + 1 : 0
            return children.slice(offset, entriesOnDisplay + offset);
        }, [children, entriesOnDisplay, startEntry]);
        return (
            <StyledTbody
                {...{ ref, colors, _css }}
                className={setClassName({ props: { className }, name: 'table__body' })}>
                {offset ? <tr role={'presentation'} style={{ height: offset }} /> : null}
                {childrenFilteredByCount.map((child) => {
                    const { children, ...restChildProps } = child.props;
                    return React.cloneElement(
                        child,
                        {
                            ...restProps,
                            ...restChildProps
                        },
                        children
                    );
                })}
            </StyledTbody>
        );
    })
);
Tbody.displayName = 'Tbody';
Tbody.tableSection = 'tbody';
Tbody.propTypes = {
    /** emotion styles for the Tbody section */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};

export { StyledTbody };
export default Tbody;
