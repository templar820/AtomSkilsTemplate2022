import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { autoAddPx, hexToRGBA } from 'lib-root/utils/styleMixins';
import getType from 'lib-root/utils/getType';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

import InlineIcons from 'lib-ui/InlineIcons';
import { renameKeyProp } from 'lib-ui/SideMenu/units/ListItem/utils';

export const StyledLi = styled.li`
    background-color: inherit;
    ${({ itemStyle, ...restProps }) => applyEmotionStyle(itemStyle, renameKeyProp(restProps))};
`;

const StyledHeading = styled('div')((props) => {
    const {
        colors,
        level,
        disabled,
        isActive,
        headingStyle,
        textTitle,
        openAnimationDuration,
        closeAnimationDuration,
        mainTransitionState,
        hasSubMenu,
        edgePadding,
        iconWidth,
        isMultiActiveAllowed,
        externalIsOpen
    } = props;

    let colorAnimationDuration = 300;
    if (mainTransitionState === 'entering') colorAnimationDuration = openAnimationDuration;
    if (mainTransitionState === 'exiting') colorAnimationDuration = closeAnimationDuration;
    return css`
        position: relative;
        padding: 12px ${hasSubMenu ? edgePadding + iconWidth + 10 : edgePadding}px 12px
            ${edgePadding + (edgePadding + 6) * level}px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ${mainTransitionState === 'exited' || !textTitle ? 'initial' : 'ellipsis'};
        border-right: 2px solid transparent;
        user-select: none;
        cursor: ${disabled || (!isMultiActiveAllowed && isActive === true) ? 'default' : 'pointer'};
        transition: color ${colorAnimationDuration}ms ease;
        &[disabled] {
            color: ${colors.GrayScale_200};
        }
        &:hover:not([disabled]) {
            color: ${colors.primary};
        }
        ${isActive &&
            css`
                font-weight: 500;
                color: ${colors.primary};
            `};
        ${isActive === true &&
            css`
                border-right-color: ${disabled ? hexToRGBA(colors.primary, 0.2) : colors.primary};
                background-color: ${hexToRGBA(colors.GrayScale_100, 0.5)};
                // needed for closed state of right green line while overflown
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: ${externalIsOpen ? '-2px' : `calc(100% - ${edgePadding * 2 + iconWidth}px)`};
                    width: 2px;
                    background-color: ${disabled ? hexToRGBA(colors.primary, 0.2) : colors.primary};
                    transition: right ${externalIsOpen ? openAnimationDuration : closeAnimationDuration}ms
                        ${externalIsOpen ? 'step-start' : 'step-end'};
                }
            `};
        &,
        &[disabled],
        &:hover,
        &:not([disabled]):hover {
            ${(mainTransitionState === 'exiting' || mainTransitionState === 'exited') && 'color: transparent;'}
        }

        ${applyEmotionStyle(headingStyle, props)};
    `;
});

export const Heading = ({ heading, ...props }) => {
    props = renameKeyProp(props);
    switch (getType(heading)) {
        case 'undefined':
            break;
        case 'function':
            return heading(props);
        case 'object':
            props = { ...props, ...heading };
            break;
        default:
            return heading;
    }
    return <StyledHeading {...props} />;
};

const StyledIcon = styled(InlineIcons)`
    margin-right: 14px;
    ${({ iconStyle, ...restProps }) => applyEmotionStyle(iconStyle, restProps)};
`;

const DotIcon = styled(StyledIcon.withComponent('span'))(({ color, iconWidth }) => {
    const size = autoAddPx(iconWidth);
    return css`
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        min-width: ${size};
        min-height: ${size};
        width: ${size};
        height: ${size};
        &:before {
            content: '';
            display: block;
            min-width: 20%;
            min-height: 20%;
            border-radius: 50%;
            background-color: ${color || 'currentColor'};
        }
    `;
});

export const Icon = ({ icon, iconWidth, _key, ...props }) => {
    const color = !props.level ? props.colors.primary : undefined;

    props = { ...props, iconWidth, color, width: iconWidth, height: iconWidth };
    switch (getType(icon)) {
        case 'undefined':
            return <DotIcon {...props} />;
        case 'string':
            props = { ...props, icon };
            break;
        case 'object':
            props = { ...props, ...icon };
            break;
        case 'function':
            return icon({ key: _key, ...props });
        default:
            return icon;
    }

    return <StyledIcon {...props} />;
};

const StyledArrowIcon = styled(InlineIcons)(({ arrowStyle, ...props }) => {
    const { isOpen, openAnimationDuration, closeAnimationDuration, edgePadding } = props;
    return css`
        position: absolute;
        top: 50%;
        right: ${edgePadding - 2}px;
        transition: transform ${isOpen ? openAnimationDuration : closeAnimationDuration}ms ease;
        transform: translateY(-50%) ${isOpen !== true && ' rotate(-90deg)'};
        cursor: pointer;
        ${applyEmotionStyle(arrowStyle, props)};
    `;
});
export const Arrow = React.forwardRef(({ arrow, iconWidth, createOpenStateHandler, _key, ...props }, ref) => {
    props = { ...props, iconWidth, width: iconWidth, height: iconWidth, icon: 'Arrow_type_1' };
    switch (getType(arrow)) {
        case 'undefined':
            if (!props.hasSubMenu) return null;
            break;
        case 'string':
            props = { ...props, icon: arrow };
            break;
        case 'object':
            props = { ...props, ...arrow };
            break;
        case 'function':
            return arrow({ key: _key, ...props });
        default:
            return arrow;
    }

    if (!props.externalIsOpen) return null;
    const { onClick, ...restProps } = props;

    return <StyledArrowIcon ref={ref} onClick={createOpenStateHandler(onClick)} {...restProps} />;
});

export const Title = ({ title, ...props }) => {
    switch (typeof title) {
        case 'function':
            return title(renameKeyProp(props));
        case 'undefined':
            return null;
        default:
            return title;
    }
};
