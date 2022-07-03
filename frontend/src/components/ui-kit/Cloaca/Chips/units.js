import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Icon from 'lib-ui/InlineIcons';

import { hexToRGBA, pickColor } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const baseStyles = ({ colors, fontSize, onClose }) => css`
    display: inline-flex;
    justify-content: center;
    min-width: ${onClose ? '20px' : 'auto'};
    min-height: 40px;
    padding: 7px 12px;
    border: 1px solid;
    border-radius: 1px;
    font-size: ${typeof fontSize === 'number' ? fontSize + 'px' : fontSize};
    line-height: 1.6;
    cursor: pointer;
    transition: 0.3s all;
    background-color: ${hexToRGBA(colors.GrayScale_100, 0.5)};
    color: ${colors.GrayScale_0};
    white-space: nowrap;
    &.hover,
    &:hover {
        background-color: ${hexToRGBA(colors.GrayScale_0, 0.2)};
        color: ${colors.GrayScale_700};
    }
    &:focus {
        outline: 0;
    }
    &:disabled {
        background-color: ${colors.GrayScale_200};
        border-color: ${colors.GrayScale_200};
        cursor: not-allowed;
        color: ${colors.GrayScale_0};
    }
`;

const colorSchemeStyles = {
    gray: ({ colors, color: customColor }) => css`
        background-color: ${hexToRGBA(pickColor(colors.GrayScale_100, null, customColor), 0.5)};
        border-color: ${hexToRGBA(pickColor(colors.GrayScale_100, null, customColor), 0.5)};
        color: ${colors.GrayScale_700};
        &.hover,
        &:hover {
            background-color: ${hexToRGBA(pickColor(colors.GrayScale_100, null, customColor), 0.5)};
            border-color: ${pickColor(colors.GrayScale_200, null, customColor)};
            box-shadow: 0 0 4px ${hexToRGBA(colors.GrayScale_700, 0.25)};
            color: ${colors.GrayScale_700};
        }
    `,
    white: ({ colors, color: customColor }) => css`
        background-color: ${hexToRGBA(pickColor(colors.GrayScale_0, null, customColor), 0.5)};
        border-color: ${hexToRGBA(pickColor(colors.GrayScale_100, null, customColor), 0.5)};
        color: ${colors.GrayScale_700};
        &.hover,
        &:hover {
            background-color: ${hexToRGBA(pickColor(colors.GrayScale_0, null, customColor), 0.5)};
            border-color: ${pickColor(colors.GrayScale_200, null, customColor)};
            box-shadow: 0 0 5px ${hexToRGBA(colors.GrayScale_700, 0.25)};
            color: ${colors.GrayScale_700};
        }
    `,
    red: ({ colors, color: customColor }) => css`
        background-color: ${hexToRGBA(pickColor(colors.errorAccent, null, customColor), 0.2)};
        border-color: ${pickColor(colors.errorAccent, null, customColor)};
        color: ${pickColor(colors.errorAccent, null, customColor)};
        &.hover,
        &:hover {
            background-color: ${hexToRGBA(pickColor(colors.errorAccent, null, customColor), 0.1)};
            color: ${colors.GrayScale_700};
        }
        &:disabled {
            background-color: ${colors.GrayScale_100};
            color: ${hexToRGBA(colors.GrayScale_700, 0.5)};
        }
    `,
    primary: ({ colors, color: customColor }) => css`
        background-color: ${pickColor(colors.primary, null, customColor)};
        border-color: ${pickColor(colors.primary, null, customColor)};
        color: ${colors.GrayScale_0};
        &.hover,
        &:hover {
            background-color: ${hexToRGBA(pickColor(colors.primary, null, customColor), 0.2)};
            color: ${colors.GrayScale_700};
        }
    `,
    checked: ({ colors, color: customColor }) => css`
        background-color: ${pickColor(colors.GrayScale_0, null, customColor)};
        border-color: ${pickColor(colors.GrayScale_0, null, customColor)};
        color: ${colors.GrayScale_700};
        &.hover,
        &:hover {
            background-color: ${hexToRGBA(pickColor(colors.primary, null, customColor), 0.2)};
            color: ${colors.GrayScale_700};
        }
    `,
    selected: ({ colors, color: customColor }) => css`
        background-color: ${pickColor(colors.primary, null, customColor)};
        border-color: ${pickColor(colors.primary, null, customColor)};
        color: ${colors.GrayScale_0};
        &.hover,
        &:hover {
            background-color: ${hexToRGBA(pickColor(colors.primary, null, customColor), 0.2)};
            border-color: ${hexToRGBA(pickColor(colors.primary, null, customColor), 0.2)};
            color: ${colors.GrayScale_700};
        }
    `
};

const StyledChips = styled.div`
    ${baseStyles}
    ${({ dashed }) => dashed && 'border-style: dashed'};
    ${({ round, radius }) => round && `border-radius: ${radius}`};
    ${(props) => (colorSchemeStyles[props.colorScheme || 'gray'] || colorSchemeStyles.primary)(props)}
    ${({ isCheckable, checked }) =>
        isCheckable && (checked ? colorSchemeStyles['selected'] : colorSchemeStyles['checked'])}
    ${({ css, ...restProps }) => applyEmotionStyle(css, restProps)};
`;

const StyledCloseBtn = styled(Icon)`
    width: 20px;
    height: 20px;
    min-width: 20px;
    margin-left: 12px;
    &.hover,
    &:hover {
        transition: 0.3s all;
        transform: scale(1.1);
    }
`;

const StyledContentWrapper = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 40px;
`;

export { StyledChips, StyledCloseBtn, StyledContentWrapper };
