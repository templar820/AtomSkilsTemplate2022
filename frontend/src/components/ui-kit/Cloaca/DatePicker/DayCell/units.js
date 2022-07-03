import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { hexToRGBA } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const BORDER_RADIUS = '100%';
const CELL_MARGIN = '1px';
const SELECT_MARGIN = `-${CELL_MARGIN}`;

const StyledDay = styled.button`
    width: 32px;
    height: 32px;
    min-height: 32px;
    line-height: 32px;
    background: transparent;
    user-select: none;
    border: 0;
    padding: 0;
    margin: ${CELL_MARGIN};
    text-align: center;
    color: ${({ colors }) => colors.GrayScale_700};
    box-sizing: inherit;
    position: relative;
    font: inherit;
    cursor: inherit !important;
    text-transform: none;
    overflow: visible;
    &:focus,
    &:hover {
        outline: none;
    }
`;

const StyledDayNumber = styled.span`
    outline: 0;
    font-weight: 300;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledDaySpan = styled.span`
    color: ${({ colors }) => colors.GrayScale_700};

    ${({ isToday, colors, isSelected, isPassive, isInRange, isStartEdge, isEndEdge }) =>
        isToday &&
        css`
            //font-weight: 500;
            color: ${isInRange || isStartEdge || isEndEdge ? colors.GrayScale_700 : colors.GrayScale_0};
        `}

    ${({ isInRange, isStartEdge, isEndEdge, colors }) =>
        (isInRange || isStartEdge || isEndEdge) && RdrDayInRange({ colors })};

    ${({ isSelected, colors }) => isSelected && StyledDayNumberSelected({ colors })};

    ${({ isPassive, disabled, colors }) =>
        (isPassive || disabled) &&
        css`
            color: ${isPassive ? colors.GrayScale_100 : colors.GrayScale_200};
            cursor: default;
        `}
    ${({ valueStyle, ...restProps }) => applyEmotionStyle(valueStyle, restProps)};
`;

const IsTodayLineStyle = ({ colors, isPassive, disabled }) => css`
    content: '';
    position: absolute;
    bottom: 7px;
    left: 50%;
    transform: translate(-50%);
    width: 16px;
    height: 1px;
    border-radius: 16px;
    background: ${colors.GrayScale_0};
    ${(isPassive || disabled) &&
        css`
            background: ${isPassive ? colors.GrayScale_100 : colors.GrayScale_200};
        `}
`;

const StyledTodaySpan = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: ${BORDER_RADIUS};
    background: ${({ colors, isSelected, isPassive, isInRange, isStartEdge, isEndEdge, disabled }) =>
        isSelected || isInRange || isStartEdge || isEndEdge
            ? hexToRGBA(colors.secondary, 0)
            : isPassive || disabled
            ? hexToRGBA(colors.secondary, 0.1)
            : colors.secondary};
    &:after {
        ${IsTodayLineStyle};
    }
`;

const StyledDayNumberSelected = ({ colors }) => css`
    color: ${colors.GrayScale_0};
    font-weight: 300;
`;

const RdrDayInRange = ({ colors }) => css`
    color: ${colors.GrayScale_0};
`;

const circleShape = () => css`
    border-radius: ${BORDER_RADIUS};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const startShape = ({ isPreview } = {}) => css`
    border-radius: ${BORDER_RADIUS} 0 0 ${BORDER_RADIUS};
    top: 2px;
    bottom: 0;
    left: 0;
    right: ${SELECT_MARGIN};
    ${isPreview &&
        css`
            border-right: transparent;
        `}
    height: 28px;
`;

const middleShape = ({ isPreview } = {}) => css`
    border-radius: 0;
    top: 2px;
    bottom: 0;
    left: ${SELECT_MARGIN};
    right: ${SELECT_MARGIN};
    ${isPreview &&
        css`
            border-right: transparent;
            border-left: transparent;
        `}
    height: 28px;
`;

const endShape = ({ isPreview } = {}) => css`
    border-radius: 0 ${BORDER_RADIUS} ${BORDER_RADIUS} 0;
    top: 2px;
    bottom: 0;
    left: ${SELECT_MARGIN};
    right: 0;
    ${isPreview &&
        css`
            border-left: transparent;
        `}
    height: 28px;
`;

const getShape = ({
    isStartEdge,
    isInRange,
    isEndEdge,
    isPassive,
    isStartOfMonth,
    isEndOfMonth,
    isStartOfWeek,
    isEndOfWeek,
    isPreview
} = {}) => {
    if (!isPassive) {
        const isStart = isStartEdge || isStartOfMonth || isStartOfWeek;
        const isEnd = isEndEdge || isEndOfMonth || isEndOfWeek;
        switch (true) {
            case isStart && isEnd:
                return circleShape({ isPreview });
            case isStart:
                return startShape({ isPreview });
            case isEnd:
                return endShape({ isPreview });
            case isInRange:
                return middleShape({ isPreview });
            default:
                return circleShape({ isPreview });
        }
    }
};

const StyledSelection = styled.span`
    color: ${({ color }) => color};

    ${({ isPassive, color, disabled }) => 'background:' + hexToRGBA(color, disabled ? 0.1 : isPassive ? 0 : 1) + ';'};

    border-radius: ${BORDER_RADIUS};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;

    ${getShape};
`;

const previewMiddle = ({ previewStyle, ...restProps }) => css`
    border-radius: 0;
    top: 3px;
    left: 0;
    right: 0;
    border-right: transparent;
    border-left: transparent;
    height: 28px;
    ${applyEmotionStyle(previewStyle, restProps)};
`;

const previewStart = ({ colors, previewStyle, ...restProps }) => css`
    border-radius: ${BORDER_RADIUS} 0 0 ${BORDER_RADIUS};
    top: 3px;
    left: 0;
    right: 0;
    border-right: transparent;
    border-left: 1px solid ${colors.primary};
    height: 28px;
    ${applyEmotionStyle(previewStyle, { colors, ...restProps })};
`;

export const previewEnd = ({ colors, previewStyle, ...restProps }) => css`
    border-radius: 0 ${BORDER_RADIUS} ${BORDER_RADIUS} 0;
    top: 3px;
    left: 0;
    right: 0;
    border-left: transparent;
    border-right: 1px solid ${colors.primary};
    height: 28px;
    ${applyEmotionStyle(previewStyle, { colors, ...restProps })};
`;

const previewStyle = ({ colors }) => css`
    border: 1px solid ${colors.primary};
    opacity: 0.8;
    z-index: 100;
    background: ${hexToRGBA(colors.primary, 0.1)};
`;

const getPreviewStyle = ({ active, hover, colors, isStartEdge, isInRange, isEndEdge, isPassive } = {}) => {
    if (!isPassive) {
        if (isStartEdge || isInRange || isEndEdge || active || hover) {
            return previewStyle({ colors });
        }
    }
};

const StyledPreview = styled.span`
    content: '';
    border-radius: ${BORDER_RADIUS};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: transparent;

    ${getPreviewStyle};
    ${getShape};
    ${({ previewStyle, ...restProps }) => applyEmotionStyle(previewStyle, restProps)};
`;

const StyledDayWrapper = styled.div`
    position: relative;
    cursor: pointer;
    &::after {
        content: '';
        pointer-events: none;
        border-radius: ${BORDER_RADIUS};
        position: absolute;
        top: 0;
        height: 34px;
        left: 0;
        right: 0;
        border: 1px solid ${({ colors }) => colors.primary};
        opacity: 0;
        z-index: 100;
        background: ${({ colors }) => hexToRGBA(colors.primary, 0.1)};
        ${({ showPreview, scroll }) =>
            (!showPreview || (scroll && scroll.enabled)) &&
            css`
                display: none;
            `}
        ${({ previewStyle, ...restProps }) => applyEmotionStyle(previewStyle, restProps)};
    }

    &:hover::after {
        opacity: 0.8;
        ${(props) => props.previewSize > 0 && previewStart(props)}
    }
    ${(props) => {
        const { isStartOfWeek, isEndOfWeek, isStartOfMonth, isEndOfMonth, previewSize } = props;
        if (previewSize > 0) {
            return css`
                &::after {
                    ${isStartOfWeek ? previewStart(props) : isEndOfWeek ? previewEnd(props) : previewMiddle(props)}
                    ${(isStartOfMonth && previewStart(props)) || (isEndOfMonth && previewEnd(props))}
                }
            `;
        }
    }};
    ${(props) => {
        const {
            noDatesSelected,
            allDatesSelected,
            monthWithSelectedDate,
            isStartOfWeek,
            isEndOfWeek,
            isPassive,
            disabled,
            isStartOfMonth,
            isEndOfMonth,
            colors
        } = props;
        return (
            !noDatesSelected &&
            !allDatesSelected &&
            !isPassive &&
            !disabled &&
            css`
                &::after {
                    ${isStartOfWeek ? previewStart(props) : isEndOfWeek ? previewEnd(props) : previewMiddle(props)}
                    ${(isStartOfMonth && previewStart(props)) || (isEndOfMonth && previewEnd(props))}
                }
                &:hover::after {
                    opacity: 0.8;
                    border-radius: ${BORDER_RADIUS} 0 0 ${BORDER_RADIUS};
                    top: 3px;
                    left: 0;
                    right: 0;
                    border-right: transparent;
                    border-left: 1px solid ${colors.primary};
                    height: 28px;
                }
                div:hover ~ &::after {
                    opacity: 0.8;
                }
                div:hover ~ [aria-selected='true'] ~ &::after {
                    opacity: 0;
                }
                [aria-selected='true']:hover ~ &::after {
                    opacity: 0;
                }
                [aria-selected='true'] ~ &::after {
                    opacity: 0.8;
                }
                [aria-selected='true'] ~ &:hover::after {
                    opacity: 0.8;
                    border-radius: 0 ${BORDER_RADIUS} ${BORDER_RADIUS} 0;
                    top: 3px;
                    left: 0;
                    right: 0;
                    border-left: transparent;
                    border-right: 1px solid ${colors.primary};
                    height: 28px;
                }
                [aria-selected='true'] ~ div:hover ~ &::after {
                    opacity: 0;
                }
                ${monthWithSelectedDate === 1 &&
                    css`
                        &::after {
                            opacity: 0.8;
                        }
                        &:hover::after {
                            ${previewEnd(props)}
                        }
                        div:hover ~ &::after {
                            opacity: 0;
                        }
                    `}
            `
        );
    }}

    &[aria-disabled='true'] {
        cursor: default;
        &::after {
            display: none;
        }
    }
`;

export { StyledSelection, StyledPreview, StyledDayNumber, StyledDay, StyledDaySpan, StyledTodaySpan, StyledDayWrapper };
