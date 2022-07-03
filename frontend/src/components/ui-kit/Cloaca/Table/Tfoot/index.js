import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import { ColorsContext } from 'lib-root/colors';
import { setClassName } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledTfoot = styled.tfoot`
    font-weight: 500;
    ${({ _css, ...restProps }) => applyEmotionStyle(_css, restProps)};
`;

const Tfoot = React.forwardRef(({ children, rowsOffsets, css: _css, className, ...restProps }, ref) => {
    const colors = useContext(ColorsContext);
    const tbodyRowsLength = React.Children.count(children);
    return (
        <StyledTfoot {...{ ref, colors, _css }} className={setClassName({ props: { className }, name: 'table__foot' })}>
            {React.Children.map(children, (child, index) => {
                const { children, ...restChildProps } = child.props;
                return React.cloneElement(
                    child,
                    {
                        rowOffset: rowsOffsets.bottoms[rowsOffsets.bottoms.length - tbodyRowsLength + index],
                        ...restProps,
                        ...restChildProps
                    },
                    children
                );
            })}
        </StyledTfoot>
    );
});
Tfoot.displayName = 'Tfoot';
Tfoot.tableSection = 'tfoot';
Tfoot.propTypes = {
    /** emotion styles for the Tfoot section */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};

export { StyledTfoot };
export default Tfoot;
