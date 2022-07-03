import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { autoAddPx } from 'lib-root/utils/styleMixins';
import { px } from 'lib-root/utils/units';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledCaption = styled.span`
    font-size: ${({ size }) => px(size, 0.9375)};
    line-height: 1.3;
`;

const StyledIcon = styled.span`
    position: relative;
    display: inline-block;
    width: ${({ size }) => px(size, 2)};
    min-width: ${({ size }) => px(size, 2)};
    height: ${({ size }) => px(size, 2)};
    min-height: ${({ size }) => px(size, 2)};
    ${({ isChildrenExist, size }) => `margin: 0 ${isChildrenExist ? px(size, 0.5) : 0} 0 0`};
    color: ${({ colors, isHovered }) => (isHovered ? colors.primaryAccent : colors.primary)};
`;

const StyledLabel = styled.label`
    ${({ colors, size, disabled, _css, isChildrenExist, ...restProps }) => css`
        display: inline-flex;
        align-items: center;
        margin: 0;
        padding-right: ${isChildrenExist ? px(size, 0.375) : 0};
        font-size: ${autoAddPx(size)};
        cursor: pointer;
        user-select: none;
        ${disabled &&
            css`
                opacity: 0.25;
                cursor: not-allowed;
            `};
        &.hover {
            opacity: 1;
            path {
                color: ${colors.primaryAccent};
                stroke: ${colors.primaryAccent};
            }
        }
        ${applyEmotionStyle(_css, { colors, size, disabled, isChildrenExist, ...restProps })};
    `}
`;

const CheckboxSvg = ({ colors, isHovered, disabled, checked, ...restProps }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
        <path
            d="M7 16C7 11.0294 11.0294 7 16 7C20.9706 7 25 11.0294 25 16C25 20.9706 20.9706 25 16 25C11.0294 25 7 20.9706 7 16Z"
            stroke={disabled ? colors.GrayScale_200 : isHovered ? 'currentColor' : colors.GrayScale_200}
            strokeWidth="2"
        />
        {checked && (
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 16C11 13.2386 13.2386 11 16 11C18.7614 11 21 13.2386 21 16C21 18.7614 18.7614 21 16 21C13.2386 21 11 18.7614 11 16Z"
                fill={disabled ? colors.primary : 'currentColor'}
            />
        )}
    </svg>
);

export { StyledLabel, StyledIcon, StyledCaption, CheckboxSvg };
