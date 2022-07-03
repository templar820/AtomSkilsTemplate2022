import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { hexToRGBA, setClassName } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

import { getSize } from '../utils';

export { List } from './List';
export { ListItem } from './ListItem';

export const Paper = styled.div`
    background-color: ${({ colors }) => colors.GrayScale_50};
    box-shadow: 0 0 5px ${({ colors }) => hexToRGBA(colors.GrayScale_700, 0.2)};
`;

export const Wrapper = styled(Paper)((props) => {
    const {
        state,
        wrapperRef: ref,
        isOpen,
        openWidth,
        openAnimationDuration,
        closeAnimationDuration,
        edgePadding,
        iconWidth,
        wrapperStyle
    } = props;
    const size = getSize({ state, isOpen, ref, direction: 'Width', min: edgePadding * 2 + iconWidth, max: openWidth });
    return css`
        display: inline-flex;
        font-size: 15px;
        overflow: hidden;
        transition-property: min-width, width;
        transition-timing-function: ease;
        transition-duration: ${isOpen === true ? openAnimationDuration : closeAnimationDuration}ms;
        height: 100%;
        width: ${size};
        min-width: ${size};
        ${applyEmotionStyle(wrapperStyle, props)};
    `;
});

const CloseIconContainer = styled('div')(
    ({ colors, externalIsOpen, openAnimationDuration, closeAnimationDuration, iconWidth, disabled }) => {
        const lineHeight = iconWidth / 10;
        const transformTranslate = iconWidth / 4;
        const padding = iconWidth / 5;
        return css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: ${iconWidth}px;
            height: ${iconWidth}px;
            padding: ${padding}px 0;
            position: relative;
            cursor: ${disabled ? 'default' : 'pointer'};
            & > div {
                height: ${lineHeight}px;
                background-color: ${disabled ? colors.GrayScale_200 : colors.primary};
                border-radius: ${lineHeight}px;
                transition: transform ${externalIsOpen === true ? openAnimationDuration : closeAnimationDuration}ms ease;
                ${externalIsOpen === true &&
                    css`
                        &:first-of-type {
                            transform: translateY(${transformTranslate}px) rotate(45deg) scaleX(0.75);
                        }
                        &:last-of-type {
                            transform: translateY(-${transformTranslate}px) rotate(-45deg) scaleX(0.75);
                        }
                        &:nth-of-type(2) {
                            transform: scaleX(0);
                        }
                    `};
            }
        `;
    }
);
const closeIconRender = ({ createOpenStateHandler, onClick, ...props }) => (
    <CloseIconContainer
        {...props}
        onClick={createOpenStateHandler(onClick)}
        className={setClassName({ props, name: 'side-menu__icon_close' })}>
        <div />
        <div />
        <div />
    </CloseIconContainer>
);
const closeHeadingStyle = css`
    padding-top: 28px;
    padding-bottom: 34px;
    cursor: default;
`;
const closeItemStyle = ({ isListScrolled, colors }) => css`
    position: sticky;
    top: 0;
    z-index: 10;
    transition: box-shadow 0.3s ease;
    box-shadow: ${isListScrolled ? `0 0px 8px ${hexToRGBA(colors.GrayScale_700, 0.1)}` : '0 0 0 transparent'};
`;
export const closeItem = {
    icon: closeIconRender,
    headingStyle: closeHeadingStyle,
    itemStyle: closeItemStyle,
    key: 'menu',
    onActiveStateChange: false
};
