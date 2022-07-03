import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { autoAddPx } from 'lib-root/utils/styleMixins';
import { px } from 'lib-root/utils/units';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledLabel = styled.label`
    display: inline-flex;
    align-items: center;
    margin: 0;
    ${({ isChildrenExist, size }) => {
        return (
            isChildrenExist &&
            css`
                padding-right: ${px(size, 0.375)};
            `
        );
    }};
    font-size: ${({ size }) => autoAddPx(size)};
    cursor: pointer;
    user-select: none;
    ${({ disabled }) => {
        return (
            disabled &&
            css`
                opacity: 0.25;
                cursor: not-allowed;
            `
        );
    }}

    ${({ _css, ...restProps }) => applyEmotionStyle(_css, restProps)};
`;

const CheckboxSquare = styled.span`
    ${({ colors, isChildrenExist, disabled, isHovered, _checked, squareStyle, size, ...restProps }) => css`
        position: relative;
        display: inline-block;
        width: 20px;
        min-width: 20px;
        height: 20px;
        min-height: 20px;
        margin: ${px(size, 0.375)};
        ${isChildrenExist &&
            css`
                margin-right: ${px(size, 0.875)};
            `};
        border-radius: ${px(size, 0.125)};
        background-color: ${disabled ? colors.GrayScale_200 : 'transparent'};
        color: ${isHovered ? colors.primaryAccent : colors.primary};
        border: ${px(size, 0.125)} solid
            ${disabled ? colors.GrayScale_200 : isHovered ? 'currentColor' : colors.GrayScale_200};
        .hover & {
            border-color: ${colors.primaryAccent};
            color: ${colors.primaryAccent};
        }
        svg {
            width: ${px(size, 1.25)};
            height: ${px(size, 1.25)};
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        ${_checked === 'indeterminate' &&
            css`
                &:after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: ${px(size, 0.5)};
                    height: ${px(size, 0.5)};
                    border-radius: ${px(size, 0.0625)};
                    background-color: ${disabled ? colors.primary : 'currentColor'};
                }
            `};

        ${applyEmotionStyle(squareStyle, {
            colors,
            isChildrenExist,
            disabled,
            isHovered,
            _checked,
            size,
            ...restProps
        })};
    `}
`;

const CheckboxCaption = styled.span`
    overflow: hidden;
    font-size: 15px;
    line-height: 24px;
    ${({ captionStyle }) => captionStyle}
`;

const CheckboxSvg = ({ colors, disabled, _checked }) =>
    _checked === true && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.83178 11.5475L6.61877 9.33452L5.20483 10.7485L7.66627 13.2102L9.11181 14.656L15.044 6.16961L13.4057 5.02246L8.83178 11.5475Z"
                fill={disabled ? colors.primary : 'currentColor'}
            />
        </svg>
    );

export { StyledLabel, CheckboxSquare, CheckboxCaption, CheckboxSvg };
