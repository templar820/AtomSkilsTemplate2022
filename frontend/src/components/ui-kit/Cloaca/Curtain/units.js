import React from 'react';
import { css, Global, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

import { useAnimationDelayer } from 'lib-root/utils/useStateDelayer';
import OutsideEventContainer from 'react-on-outside-event/dist/OutsideEventContainer';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';
import config from './config';

const StyledCurtain = styled(OutsideEventContainer, {
    shouldForwardProp: (prop) => isPropValid(prop) || prop === 'callback'
})`
    ${({ size, curtainStyle, position, zIndex, isDragging, maxPercent, minPercent, overlay, ...restProps }) => {
        const { vertical } = config.position[position];
        return css`
            position: ${overlay ? 'absolute' : 'relative'};
            z-index: ${zIndex};
            ${[position]}: 0;
            ${[vertical ? 'left' : 'top']}: 0;
            ${[vertical ? 'width' : 'height']}: 100%;
            ${[vertical ? 'height' : 'width']}: ${size !== undefined ? size : 'auto'};
            max-${[vertical ? 'height' : 'width']}: ${parseInt(maxPercent)}%;
            min-${[vertical ? 'height' : 'width']}: ${parseInt(minPercent)}%;
            ${applyEmotionStyle(curtainStyle, {
                size,
                position,
                zIndex,
                isDragging,
                maxPercent,
                minPercent,
                overlay,
                ...restProps
            })};
        `;
    }}
`;

const StyledResizer = styled.div`
    ${({ colors, resizerStyle, isDragging, position, ...restProps }) => {
        const { vertical } = config.position[position];
        return css`
            position: absolute;
            z-index: 1;
            ${[position]}: calc(100% - 3px);
            ${vertical ? 'left' : 'top'}: 0;
            ${vertical ? 'height' : 'width'}: 6px;
            ${vertical ? 'width' : 'height'}: 100%;
            cursor: ${vertical ? 'row-resize' : 'col-resize'};
            transition: background-color 0.1s;
            &:after {
                content: '';
                position: absolute;
                ${vertical ? 'left' : 'top'}: 50%;
                transform: translate${vertical ? 'X' : 'Y'}(-50%);
                ${vertical ? 'width' : 'height'}: 200px;
                max-${vertical ? 'height' : 'width'}: 100%;
                ${vertical ? 'height' : 'width'}: 6px;
                background-color: ${!isDragging ? colors.primary : colors.primaryAccent};
                border-radius: 4px;
                transition: background-color .3s ease;
            }
            &:hover {
                &:after {
                    background-color: ${colors.primaryAccent};
                }
            }
            ${applyEmotionStyle(resizerStyle, { colors, isDragging, position, ...restProps })};
        `;
    }}
`;

const fadeInAnimation = keyframes`
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.45;
          }
        `;
const fadeOutAnimation = keyframes`
          0% {
            opacity: 0.45;
          }
          100% {
            opacity: 0;
          }
        `;
const StyledBackdrop = styled.div`
    ${({ colors, backdropStyle: styles, zIndex, isDragging, showBackdrop, ...restProps }) => css`
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: ${zIndex - 30};
        background-color: ${colors.GrayScale_900};
        animation: ${showBackdrop ? fadeInAnimation : fadeOutAnimation} 300ms ease forwards;
        ${applyEmotionStyle(styles, { colors, zIndex, isDragging, showBackdrop, ...restProps })};
    `}
`;

const Backdrop = (props) => {
    const inDOM = useAnimationDelayer({ state: !!props.showBackdrop, appear: 0, disappear: 300 });
    return !inDOM ? null : <StyledBackdrop {...props} />;
};

const Overflow = styled.div`
    overflow: ${({ overflowHidden }) => (overflowHidden ? 'hidden' : 'auto')};
    ${({ overflowStyle, ...restProps }) => applyEmotionStyle(overflowStyle, restProps)};
`;

const GlobalStyles = ({ isDragging, position }) => {
    if (!isDragging) return null;
    const { vertical } = config.position[position];
    return (
        <Global
            styles={css`
                body {
                    cursor: ${vertical ? 'row-resize' : 'col-resize'};
                    user-select: none;
                }
            `}
        />
    );
};

export { StyledCurtain, StyledResizer, Overflow, Backdrop, GlobalStyles };
