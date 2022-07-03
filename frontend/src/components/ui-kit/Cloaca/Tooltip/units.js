import React from 'react';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Icon from 'lib-ui/InlineIcons';
import Paper from 'lib-ui/Paper';
import { Portal } from 'lib-ui/utils';

import { autoAddPx, hexToRGBA } from 'lib-root/utils/styleMixins';
import { positions } from 'lib-root/utils/position';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const Wrapper = styled.div`
    display: inline-flex;
    ${({ wrapperStyle, ...rest }) => applyEmotionStyle(wrapperStyle, rest)};
`;

const TriggerWrapper = styled.div`
    display: inline-flex;
    ${({ triggerWrapperStyle, ...rest }) => applyEmotionStyle(triggerWrapperStyle, rest)};
`;

const StyledPortal = styled.div`
    ${({ opposite, distance, mainPlacement, perpendicular, oppositePerpendicular }) => css`
        position: relative;
        margin-${opposite}: ${distance}px;
        &:before {
          content: '';
          position: absolute;
          ${opposite}: -${distance}px;
          ${mainPlacement}: 100%;
          ${perpendicular}: 0;
          ${oppositePerpendicular}: 0;
        }
    `};
    ${({ animationStyles, ...rest }) => applyEmotionStyle(animationStyles, rest)};

    ${({ portalStyle, ...rest }) => applyEmotionStyle(portalStyle, rest)};
`;

const StyledPaper = styled(Paper)`
    display: block;
    position: relative;
    min-width: 50px;
    padding: 28px;
    font-size: ${({ size }) => autoAddPx(size)};
    ${({ width }) => width && `max-width:${autoAddPx(width)}`};
    ${({ paperStyle, ...rest }) => applyEmotionStyle(paperStyle, rest)};
`;

const StyledIcon = styled(Icon)`
    position: relative;
    cursor: pointer;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
`;

const StyledArrow = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;
    border-width: 6px;
    position: absolute;
    ${({ mainPlacement, opposite, oppositeAxis, perpendicular, shadow, colors }) =>
        mainPlacement &&
        css`
            ${mainPlacement}: 0;
            ${perpendicular}: 50%;
            transform: translate${oppositeAxis}(-50%);
            border-${mainPlacement}-width: ${shadow ? '6px' : '8px'};
            border-${mainPlacement}-color: ${shadow ? hexToRGBA(colors.GrayScale_700, 0.3) : colors.GrayScale_0};
            border-${opposite}-width: 0;
            filter: ${shadow ? 'blur(9.6px)' : 'none'};
        `};
`;

const ArrowWrapper = styled.div`
    width: 20px;
    height: 20px;
    overflow: hidden;
    position: absolute;
    pointer-events: none;
    ${({ mainPlacement }) => mainPlacement}: 100%;
`;

const Arrow = React.forwardRef(({ style, distance, className, ...restProps }, ref) => {
    const { opposite, oppositeAxis, perpendicular } = positions[restProps.mainPlacement] || {};
    return (
        <ArrowWrapper {...{ role: 'presentation', style, ref, opposite, distance, className, ...restProps }}>
            <StyledArrow {...{ opposite, oppositeAxis, perpendicular, shadow: true, ...restProps }} />
            <StyledArrow {...{ opposite, oppositeAxis, perpendicular, ...restProps }} />
        </ArrowWrapper>
    );
});

const PortalManager = ({ inDOM, usingPortal, children, ...restProps }) =>
    !inDOM ? null : (
        <Portal {...{ node: usingPortal ? undefined : false, roleName: 'tooltip', ...restProps }}>{children}</Portal>
    );

export { Arrow, PortalManager, Wrapper, StyledPortal, StyledPaper, StyledIcon, TriggerWrapper };
