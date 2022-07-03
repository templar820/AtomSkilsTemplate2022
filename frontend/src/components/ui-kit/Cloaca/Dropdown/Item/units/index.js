import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import ChildDropdownRenderer from './ChildDropdownRenderer';
import RightIcon from './RightIcon';
import LeftIcon from './LeftIcon';
import Highlighter from './Highlighter';

import { hexToRGBA } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledItemWrapper = styled.li`
    list-style: none;
    min-height: 40px;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

const StyledItem = styled.span`
    ${({ colors, childDropdown, rightIcon, isHovered, active, isSelected, disabled }) => css`
        display: block;
        max-width: 100%;
        line-height: 32px;
        padding: 4px 32px;
        ${(childDropdown || rightIcon) &&
            css`
                padding-right: 52px;
            `};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        position: relative;
        font-size: 15px;
        scroll-snap-align: end;
        user-select: none;
        &:hover {
            background-color: ${hexToRGBA(colors.GrayScale_100, 0.5)};
        }
        ${(isHovered || active) &&
            css`
                background-color: ${hexToRGBA(colors.GrayScale_100, 0.5)};
            `};
        ${isSelected &&
            css`
                background-color: ${hexToRGBA(colors.GrayScale_200, 0.5)};
            `};
        ${disabled &&
            css`
                color: ${hexToRGBA(colors.GrayScale_700, 0.2)};
                pointer-events: none;
            `};
        strong {
            font-weight: 500;
        }
    `}
`;

export { ChildDropdownRenderer, LeftIcon, RightIcon, Highlighter, StyledItem, StyledItemWrapper };
