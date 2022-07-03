import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { autoAddPx } from 'lib-root/utils/styleMixins';

import { calcCapsRounds, calcLineCaps } from '../utils';

import { Path } from './index';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledSvg = styled.svg`
    display: block;
    overflow: visible;
    width: ${({ width }) => width};
    height: ${({ width }) => width};
`;

const LineBar = styled.div`
    ${({ barWidth, barColor, capsRounds, capsRadius, showCaption, barStyle, ...restProps }) => css`
        flex-grow: 1;
        position: relative;
        height: ${autoAddPx(barWidth)};
        background: ${barColor};
        overflow: hidden;
        border-radius: ${calcLineCaps(capsRounds, capsRadius)};
        ${showCaption &&
            css`
                margin-right: 8px;
            `};
        ${applyEmotionStyle(barStyle, { barWidth, barColor, capsRounds, capsRadius, showCaption, ...restProps })};
    `}
`;

const CircleBar = (props) => {
    const { children, barWidth: width, barColor: color, svgWidth, barStyle, ...restProps } = props;
    return (
        <StyledSvg width={autoAddPx(svgWidth)} viewBox={`0 0 ${svgWidth} ${svgWidth}`}>
            <Path {...{ width, color, additionalStyles: barStyle, ...restProps }} />
            {children}
        </StyledSvg>
    );
};

const Bar = (props) => {
    const { progressType, startPosition, percent, caps, capsRadius, invertMarginalCaps, ...restProps } = props;
    const PickedBar = progressType === 'line' ? LineBar : CircleBar;
    const capsRounds = calcCapsRounds(startPosition, percent, caps, invertMarginalCaps);

    return <PickedBar {...{ progressType, capsRounds, caps, capsRadius, ...restProps }} />;
};

export default Bar;
