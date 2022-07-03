import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { autoAddPx } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const barStyles = ({ barColor, barWidth, isFiller }) => css`
    display: flex;
    position: ${isFiller ? 'absolute' : 'relative'};
    background: ${barColor};
    border-radius: ${autoAddPx(barWidth / 2)};
`;

const HorizBar = styled.div`
    ${({ barColor, barWidth, isFiller, values, barStyle, ...rest }) => css`
        left: ${Math.min(...values)}%;
        width: ${Math.abs(values[1] - values[0])}%;
        ${!isFiller && 'min-width: 250px;'};
        height: ${autoAddPx(barWidth)};
        ${barStyles({ barColor, barWidth, isFiller })};
        ${applyEmotionStyle(barStyle, { barColor, barWidth, isFiller, values, ...rest })};
    `};
`;

const VertBar = styled.div`
    ${({ barColor, barWidth, isFiller, values, barStyle, ...rest }) => css`
        bottom: ${Math.min(...values)}%;
        height: ${Math.abs(values[1] - values[0])}%;
        ${!isFiller && 'min-height: 250px;'};
        width: ${autoAddPx(barWidth)};
        ${barStyles({ barColor, barWidth, isFiller })};
        ${applyEmotionStyle(barStyle, { barColor, barWidth, isFiller, values, ...rest })};
    `};
`;

const convertBarPositionToArray = (values) => (Array.isArray(values) ? values : [0, values]);

const Bar = React.forwardRef((props, ref) => {
    const { orientation, value = [0, 100], ...restProps } = props;
    const values = convertBarPositionToArray(value);

    const barProps = { values, ref, ...restProps };

    return orientation === 'vertical' ? <VertBar {...barProps} /> : <HorizBar {...barProps} />;
});

export default Bar;
