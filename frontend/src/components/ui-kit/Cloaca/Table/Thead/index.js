import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

import { ColorsContext } from 'lib-root/colors';
import { setClassName } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledThead = styled.thead`
    background: ${({ colors }) => colors.GrayScale_50};
    font-weight: 500;
    ${({ _css, ...restProps }) => applyEmotionStyle(_css, restProps)};
`;

const StyledTechCell = styled.th`
    padding: 0;
    top: 0;
    position: sticky;
    z-index: 100;
    font-weight: inherit;
`;

const TechRow = ({ columnsCount }) => (
    <tr role={'presentation'}>
        {Array.from(Array(columnsCount), (_, key) => (
            <StyledTechCell {...{ key }} />
        ))}
    </tr>
);

const Thead = React.forwardRef(({ className, children, rowsOffsets, columnsCount, css: _css, ...restProps }, ref) => {
    const colors = useContext(ColorsContext);

    return (
        <StyledThead {...{ ref, colors, _css }} className={setClassName({ props: { className }, name: 'table__head' })}>
            <TechRow {...{ columnsCount }} />
            {React.Children.map(children, (child, index) => {
                const { children, ...restChildProps } = child.props;
                return React.cloneElement(
                    child,
                    {
                        rowOffset: rowsOffsets.tops[index + 1],
                        columnsCount,
                        ...restProps,
                        ...restChildProps
                    },
                    children
                );
            })}
        </StyledThead>
    );
});
Thead.displayName = 'Thead';
Thead.tableSection = 'thead';
Thead.propTypes = {
    /** emotion styles for the Thead section */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};

export { StyledThead };
export default Thead;
