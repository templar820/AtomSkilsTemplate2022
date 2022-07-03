import React, { useContext } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { hexToRGBA } from 'lib-root/utils/styleMixins';
import { ColorsContext } from 'lib-root/colors';

import InlineIcon from 'lib-ui/InlineIcons';
import Spinner from 'lib-ui/Spinner';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

// TopLine units
const StyledTopLine = styled.span`
    display: flex;
    align-items: flex-start;
    min-height: 24px;
    z-index: 2;
    ${({ selection, itemHeight }) =>
        selection &&
        css`
            height: ${itemHeight}px;
            align-items: center;
            position: relative;
        `}
    ${({ topLineStyle, ...restProps }) => applyEmotionStyle(topLineStyle, restProps)};

    ${({ nestingLevel, selection }) =>
        nestingLevel <= 1
            ? selection && 'padding-left:' + nestingLevel * 29 + 'px;'
            : selection && 'padding-left:' + nestingLevel * 36 + 'px;'}
`;

const StyledOverlay = styled.div`
    ${({ colors, selection, hovered, itemHeight }) =>
        selection &&
        css`
            cursor: pointer;
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            width: 100vw;
            z-index: 1;
            height: ${itemHeight}px;
            background-color: ${hovered && hexToRGBA(colors.GrayScale_100, 0.5)};
        `};

    ${({ colors, checked, parentChecked, selection }) =>
        selection &&
        checked === true &&
        parentChecked !== true &&
        css`
            background-color: ${hexToRGBA(colors.GrayScale_200, 0.5)};
        `};
    ${({ overlayStyles, ...restProps }) => applyEmotionStyle(overlayStyles, restProps)};
`;

// TextAndCheckbox units
const calcCheckboxStyle = (extraStyles) => css`
    align-items: flex-start;
    width: 100%;
    ${applyEmotionStyle(extraStyles)}
`;

const calcCheckboxSquareStyle = (colors, extraStyles, selectionStatus, checkedStatus) => css`
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 0;
    ${selectionStatus &&
        css`
            border: none;
            color: ${colors.GrayScale_700};
            order: 3;
            margin-left: 128px;
        `}
    ${selectionStatus &&
        checkedStatus === 'indeterminate' &&
        css`
            display: none;
        `}    
    ${applyEmotionStyle(extraStyles)}
`;

const calcCheckboxCaptionStyle = (extraStyles) => css`
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    line-height: 20px;
    ${applyEmotionStyle(extraStyles)};
`;

const StyledCheckboxText = styled.span`
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    ${({ selection }) =>
        selection &&
        css`
            white-space: nowrap;
        `}
`;

// Icon  units
const IconContainer = styled.span`
    min-width: 20px;
    min-height: 20px;
    margin-right: 14px;
    position: relative;
`;
const IconPositioner = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
`;

const DotIcon = styled.span`
    display: block;
    width: 3.75px;
    height: 3.75px;
    border-radius: 50%;
    background-color: ${({ selection, colors }) => (selection ? colors.GrayScale_200 : colors.primary)};
    ${({ dotIconStyles, ...restProps }) => applyEmotionStyle(dotIconStyles, restProps)};
`;

const defaultLoadingStyle = css`
    display: inline-block;
    vertical-align: middle;
    width: 18.75px;
`;

const arrowStyle = (expanded, animationDuration) => css`
    transition: ${animationDuration + 'ms'} transform;
    cursor: pointer;
    ${!expanded &&
        css`
            transform: rotate(-90deg);
        `}
`;
const ArrowIcon = ({ colors, expanded, animationDuration }) => (
    <InlineIcon
        w="20px"
        h="20px"
        color={colors.GrayScale_200}
        css={arrowStyle(expanded, animationDuration)}
        icon="Arrow_type_1"
    />
);

const DefaultLoadingIcon = () => <Spinner wrapperStyle={defaultLoadingStyle} size={6} />;

const DefaultIcon = ({ expanded, hasSubtree, animationDuration, selection, dotIconStyles }) => {
    const colors = useContext(ColorsContext);
    return hasSubtree ? (
        <ArrowIcon {...{ colors, expanded, animationDuration }} />
    ) : (
        <DotIcon {...{ colors, selection, dotIconStyles }} />
    );
};

// TreeItem units

const defaultHighlight = ({ colors, highlight }) => css`
    color: ${colors.primary};
    ${highlight};
`;

const StyledTreeItem = styled.li`
    ${({ colors, disabled, isLined, selection, itemStyle, ...restProps }) => css`
        display: block;
        position: relative;
        padding: 3px 0;
        ${disabled &&
            css`
                opacity: 0.2;
                cursor: default;
                pointer-events: none;
                user-select: none;
            `};
        ${isLined &&
            css`
                position: relative;
                &:not(:last-of-type):before {
                    content: '';
                    position: absolute;
                    top: 23px;
                    left: 10px;
                    bottom: -3px;
                    width: 1px;
                    pointer-events: none;
                    background: ${colors.GrayScale_100};
                }
            `};
        ${selection &&
            css`
                padding: 0;
            `}
        ${applyEmotionStyle(itemStyle, { colors, disabled, isLined, selection, ...restProps })};
    `}
`;

export {
    StyledTopLine,
    calcCheckboxStyle,
    calcCheckboxSquareStyle,
    calcCheckboxCaptionStyle,
    StyledCheckboxText,
    IconContainer,
    IconPositioner,
    DefaultLoadingIcon,
    DefaultIcon,
    defaultHighlight,
    StyledTreeItem,
    StyledOverlay
};
