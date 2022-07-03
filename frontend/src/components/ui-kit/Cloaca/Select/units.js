import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { OutsideEventContainer } from 'react-on-outside-event';

import Icon from 'lib-ui/InlineIcons';

import { hexToRGBA } from 'lib-root/utils/styleMixins';
import isPropValid from '@emotion/is-prop-valid';
import { withProps } from 'hoc-with-props';
import Dropdown from 'lib-ui/Dropdown/Dropdown';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledOutsideEventContainer = styled(OutsideEventContainer, {
    shouldForwardProp: (prop) => prop !== 'selectWrapperStyle'
})`
    position: relative;
    width: 100%;
    ${({ selectWrapperStyle, ...restProps }) => applyEmotionStyle(selectWrapperStyle, restProps)};
`;

const StyledSelectWrapper = styled('div', {
    shouldForwardProp: isPropValid
})`
    position: relative;
    ${({ selectWrapperStyle, ...restProps }) => applyEmotionStyle(selectWrapperStyle, restProps)};
`;

const StyledSelectIcon = styled(Icon)`
    cursor: pointer;
    transform: rotate(0deg);
    ${({ closeIcon }) => !closeIcon && 'transition: transform 0.3s ease;'}
    ${({ isOpen }) => isOpen && 'transform: rotate(-180deg);'}
    ${({ isClearBtnEnabled, closeIcon }) => {
        if (!isClearBtnEnabled) {
            return `display: ${closeIcon ? 'none' : 'block'};`;
        } else {
            return css`
                display: ${closeIcon ? 'none' : 'block'};
                ${StyledOutsideEventContainer}:hover & {
                    display: ${closeIcon ? 'block' : 'none'};
                }
            `;
        }
    }}
`;

const StyledDropdownGrabber = styled.div`
    ${({ isOpen, zIndex }) => css`
        position: absolute;
        top: 0;
        left: 0;
        z-index: ${zIndex};
        transition: visibility 0.2s, opacity 0.2s;
        visibility: ${isOpen ? 'visible' : 'hidden'};
        opacity: ${+!!isOpen};
    `}
`;

const StyledContentValue = styled.span`
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    white-space: nowrap;
`;

const getInputStyles = (userStyle, { /*autoSuggest,*/ multi } = {}) => css`
    padding-left: ${!multi && '0'};
    min-width: ${!multi && 'auto'};
    ${userStyle};
`;

const getInnerStyle = (userStyle, { multi } = {}) => css`
    flex-wrap: ${multi ? 'wrap' : 'nowrap'};
    padding-left: ${multi && '4px'};
    ${userStyle};
`;

const getInputWrapperStyle = (userStyle /*, props = {}, state = {}*/) => css`
    ${userStyle};
`;

const NativeSelect = styled.select`
    &:active,
    &:hover,
    &:focus-within,
    &:focus {
        outline: none;
    }
    width: 100%;
    background-color: transparent;
    padding: 5px 16px;
    appearance: none;
    border-radius: 0;
    position: relative;

    ${({ colors }) => css`
        &[multiple]:focus option:hover:not([disabled]) {
            background: ${colors.GrayScale_100};
        }

        border-color: ${colors.GrayScale_200};

        &:hover {
            border-color: ${hexToRGBA(colors.GrayScale_700, 0.5)}};
        }
    `}

    &:not([multiple]) {
        height: 48px;
    }

    option {
        padding: 5px 0;
    }

    svg {
        position: absolute;
        right: 0;
        top: 50%;
    }

    ${({ customStyles }) => customStyles}
`;

const NativeIcon = () => {
    return (
        <Icon
            icon={'Triangle'}
            w={'20px'}
            h={'20px'}
            css={css`
                position: absolute;
                right: 8px;
                top: calc(50% - 10px);
            `}
        />
    );
};

const listStyle = css`
    li {
        overflow: visible;
    }
`;
const StyledDropdown = withProps(({ isTreeSelect }) => ({
    'tab-index': -1,
    'aria-expanded': true,
    role: 'list',
    listStyle: isTreeSelect ? listStyle : undefined
}))(Dropdown);

export {
    StyledDropdown,
    StyledOutsideEventContainer,
    StyledSelectIcon,
    StyledDropdownGrabber,
    StyledContentValue,
    StyledSelectWrapper,
    getInputStyles,
    getInnerStyle,
    getInputWrapperStyle,
    NativeSelect,
    NativeIcon
};
