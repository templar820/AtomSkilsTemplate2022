import React, { useMemo, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

import List from 'react-virtualized/dist/commonjs/List';
import { usePopper } from 'react-popper';

import Portal from 'lib-ui/utils/Portal/Portal';

import Paper from 'lib-ui/Paper';
import { autoAddPx, hexToRGBA } from 'lib-root/utils/styleMixins';
import { positions, getMainPopperPlacement, applyPopperProps } from 'lib-root/utils/position';
import conf from '../config';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';
const { dropdownPadding } = conf;

const StyledVirtualList = styled(List)`
    outline: none;
    scroll-behavior: smooth;
    padding-top: ${dropdownPadding}px;
    padding-bottom: ${dropdownPadding}px;
`;

const StyledPaperWrapper = styled.div`
    display: flex;
    position: relative;
    ${({ animationStyles }) => animationStyles}
    ${({ paperWrapperStyle, ...restProps }) => applyEmotionStyle(paperWrapperStyle, restProps)};
`;

const StyledPaper = styled(Paper, {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'onTriggerDropdownOpenStateChange'
})`
    ${({
        colors,
        maxNumberOfVisibleOptions,
        disableSideShadow,
        paperStyle,
        paperHeight,
        css: _css,
        ...restProps
    }) => css`
        display: flex;
        max-height: ${autoAddPx(paperHeight)};
        overflow: hidden;
        padding: 0;
        list-style: none;
        width: 100%;
        position: relative;

        ${disableSideShadow &&
            css`
                overflow: visible;
                box-shadow: none;
                &:before {
                    content: '';
                    position: absolute;
                    z-index: -1;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    ${disableSideShadow}: 16px;
                    box-shadow: 0 0 16px ${hexToRGBA(colors.GrayScale_700, 0.2)};
                }
            `};
        ${_css};
        ${applyEmotionStyle(paperStyle, {
            colors,
            maxNumberOfVisibleOptions,
            disableSideShadow,
            css: _css,
            ...restProps
        })};
    `}
`;

const StyledList = styled('ul', {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isLoading'
})`
    list-style: none;
    width: 100%;
    margin: 0;
    ${({ virtualization }) => (virtualization ? `padding: 0;` : `padding: ${autoAddPx(dropdownPadding)} 0;`)};
    overflow-y: auto;
    scroll-snap-type: ${({ scrollSnapping }) => (scrollSnapping ? 'y' : 'none')};
    li {
        scroll-snap-align: end;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    ${({ isLoading }) =>
        isLoading &&
        css`
            li:not(:last-of-type) {
                opacity: 0.2;
                pointer-events: none;
                cursor: default;
            }
        `}
    ${({ listStyle, ...restProps }) => applyEmotionStyle(listStyle, restProps)};
`;

const StyledLoadingWrapper = styled.li`
    min-height: 40px;
    position: relative;
    scroll-snap-align: end;
`;

const wrapperStyle = () => css`
    padding: 15px 0;
    align-items: flex-end;
`;

const StyledTrigger = styled.div`
    display: inline-flex;
    outline: none;
    ${({ triggerAction, disableTriggerElement }) =>
        triggerAction === 'click' &&
        !disableTriggerElement &&
        css`
            cursor: pointer;
        `}
    ${({ triggerStyle, ...restProps }) => applyEmotionStyle(triggerStyle, restProps)};
`;

const OutsideContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

const Positioner = ({
    triggerRef,
    triggerElement,
    children,
    triggerPlacement,
    triggerPopperProps,
    positionUpdater
}) => {
    const [popperElement, setPopperElement] = useState();
    const options = useMemo(() => applyPopperProps({ placement: triggerPlacement }, triggerPopperProps), [
        triggerPlacement,
        triggerPopperProps
    ]);
    const { styles, state, update } = usePopper(triggerRef.current, popperElement, options);
    const { placement } = state || {};
    const { opposite } = positions[getMainPopperPlacement(placement) || 'bottom'];

    positionUpdater.current = update;
    return (
        <Portal node={!!triggerElement} roleName={'dropdown'}>
            {children({ setPopperElement, opposite, popperStyle: triggerElement ? styles.popper : undefined })}
        </Portal>
    );
};

export {
    StyledPaperWrapper,
    StyledPaper,
    StyledList,
    StyledLoadingWrapper,
    wrapperStyle,
    StyledTrigger,
    Positioner,
    StyledVirtualList,
    OutsideContainer
};
