import React from 'react';

import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

import { hexToRGBA, pickColor } from 'lib-root/utils/styleMixins';

import Icon from 'lib-ui/InlineIcons';

import config from './config';

import { btnSizes, _lighten } from './utils';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const fadeInAnimation = keyframes`
          100% {
            opacity: 1;
          }
        `;

const baseStyles = ({ icon, size = 'lg', fontSize, color: customColor, colorDiff, isLoading, colors }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: ${icon ? '24px' : 'auto'};
    width: ${icon ? btnSizes(fontSize)[size].iconBtnWidth : 'auto'};
    height: ${btnSizes(fontSize)[size].height};
    margin: 0;
    padding: ${icon ? '0' : `5px ` + btnSizes(fontSize)[size].vPadding};
    border: 1px solid;
    border-radius: ${icon ? '100%' : '100px'};
    font-weight: 500;
    font-size: ${fontSize ? (typeof fontSize === 'number' ? fontSize + 'px' : fontSize) : '15px'};
    line-height: 1.6;
    cursor: pointer;
    user-select: none;
    transition: 0.3s all;
    color: ${colors.GrayScale_0};
    white-space: nowrap;
    ${isLoading && 'pointer-events: none;'}
    &.hover,
    &:hover {
        background-color: ${pickColor(colors.primaryAccent, _lighten, customColor, { colorDiff })};
        border-color: ${pickColor(colors.primaryAccent, _lighten, customColor, { colorDiff })};
        color: ${colors.GrayScale_0};
    }
    &:focus {
        outline: 0;
    }
    &:active,
    &.active {
        border-color: transparent;
        background-color: ${colors.tertiaryAccent};
        box-shadow: inset 0 1px 3px ${colors.GrayScale_700};
        color: ${colors.GrayScale_0};
    }
    &:disabled {
        background-color: ${colors.GrayScale_200};
        border-color: ${colors.GrayScale_200};
        cursor: not-allowed;
        color: ${colors.GrayScale_0};
    }
    &:after {
        content: '';
        min-height: inherit;
        font-size: 0;
    }
`;

const colorSchemeStyles = {
    secondary: ({ color: customColor, colorDiff, colors }) => css`
        &:not(:disabled) {
            &:not(:active):not(.active) {
                background-color: ${pickColor(colors.secondary, null, customColor)};
                border-color: ${pickColor(colors.secondary, null, customColor)};
                &:hover,
                &.hover {
                    background-color: ${pickColor(colors.secondaryAccent, _lighten, customColor, {
                        colorDiff
                    })};
                    border-color: ${pickColor(colors.secondaryAccent, _lighten, customColor, {
                        colorDiff
                    })};
                }
            }
        }
    `,
    white: ({ colors }) => css`
        background-color: ${colors.GrayScale_0};
        border-color: ${colors.GrayScale_0};
        color: ${colors.GrayScale_700};
        &:active,
        &.active {
            background-color: transparent;
            border: 1px solid ${colors.GrayScale_0};
            box-shadow: none;
        }
        &:disabled {
            background-color: ${colors.GrayScale_100};
            color: ${hexToRGBA(colors.GrayScale_700, 0.5)};
        }
    `,
    outline: ({ color: customColor, colors }) => css`
        background-color: transparent;
        border-color: ${pickColor(colors.GrayScale_0, null, customColor)};
        color: ${pickColor(colors.GrayScale_0, null, customColor)};
        &:active,
        &.active,
        &:disabled {
            background-color: transparent;
            border: 1px solid ${pickColor(colors.GrayScale_0, null, customColor)};
            color: ${pickColor(colors.GrayScale_0, null, customColor)};
            box-shadow: none;
        }
        &:disabled {
            opacity: 0.5;
        }
        &:not(:disabled) {
            &:not(:active):not(.active) {
                &.hover,
                &:hover {
                    background-color: ${pickColor(colors.primaryAccent, null, customColor)};
                    border-color: ${pickColor(colors.primaryAccent, null, customColor)};
                }
            }
        }
    `,
    primary: ({ color: customColor, colors }) => css`
        background-color: ${pickColor(colors.primary, null, customColor)};
        border-color: ${pickColor(colors.primary, null, customColor)};
    `
};

const StyledButton = styled('button', {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isLoading'
})`
    ${baseStyles}
    ${(props) => (colorSchemeStyles[props.colorScheme || 'primary'] || colorSchemeStyles.primary)(props)}
    ${({ css, ...restProps }) => applyEmotionStyle(css, restProps)};
`;

const StyledRightIcon = styled(Icon)`
    ${({ isRotate }) => (isRotate ? 'transform: rotate(270deg);' : '')}
`;

const StyledLeftIcon = styled(Icon)`
    margin-right: 4px;
`;

const StyledContentWrapper = styled.span`
    margin-right: ${({ rightIcon }) => (rightIcon ? '-16px' : '0')};
    min-width: 60px;
    opacity: 0;
    animation: ${fadeInAnimation} ${config.animation.duration}ms forwards;
`;

const StyledButtonInner = styled('div', {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isLoading'
})`
    display: flex;
    justify-content: center;
`;

const Fade = styled.div`
    opacity: 0;
    animation: ${fadeInAnimation} ${config.animation.duration}ms forwards;
`;

export {
    baseStyles,
    colorSchemeStyles,
    StyledButton,
    StyledRightIcon,
    StyledLeftIcon,
    StyledContentWrapper,
    StyledButtonInner,
    Fade
};
