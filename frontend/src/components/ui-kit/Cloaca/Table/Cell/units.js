import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { StyledThead } from '../Thead';
import { StyledTbody } from '../Tbody';
import { StyledTfoot } from '../Tfoot';
import { StyledRow } from '../Row';

import { hexToRGBA } from 'lib-root/utils/styleMixins';
import Sorter from '../Sorter';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const ChildrenWrapper = styled.span`
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const rightSlotStyles = css`
    position: absolute;
    right: 10px;
`;

const SlotWrapper = styled.span`
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    transform: translateY(-2px);
    ${({ slot }) => slot === 'right' && rightSlotStyles};
`;

const Slot = ({ children, slot }) => (children ? <SlotWrapper slot={slot}>{children}</SlotWrapper> : null);

const TitleSorter = styled(Sorter)`
    user-select: none;
    transition: opacity 0.2s ease;
    &:hover {
        opacity: 0.9;
    }
`;

const slotSorterWrapper = ({ currentDirection }) => css`
    user-select: none;
    cursor: pointer;
    transition: opacity 0.3s ease;
    opacity: ${+(currentDirection !== 'normal')};
    ${TitleSorter}:hover + ${SlotWrapper} > &,
    &:hover {
        opacity: 1;
    }
`;

const lastRowStyles = css`
    ${StyledTfoot}:last-child > ${StyledRow}:last-of-type > &,
    ${StyledTbody}:last-child > ${StyledRow}:last-of-type > & {
        padding: 17px 28px 26px;
    }
`;

const fixedStyles = ({ colors, fixedConfig, firstCol, lastCol, showHorizontalScrollShadows, isScrolled }) =>
    fixedConfig &&
    css`
        @supports (position: sticky) {
            position: sticky;
        }
        ${fixedConfig};
        ${(firstCol || lastCol) &&
            showHorizontalScrollShadows &&
            css`
                @supports (position: sticky) {
                    &:after {
                        content: '';
                        pointer-events: none;
                        position: absolute;
                        ${!firstCol ? 'right' : 'left'}: 100%;
                        top: 0;
                        bottom: 0;
                        width: 8px;
                        transition: opacity 0.3s ease;
                        opacity: ${+((firstCol && isScrolled.left) || (!firstCol && isScrolled.right))};
                        background: linear-gradient(
                            to ${!firstCol ? 'left' : 'right'},
                            ${hexToRGBA(colors.GrayScale_700, 0.1)},
                            transparent
                        );
                    }
                }
            `};
    `;

const bordersStyles = ({ colors, isEdgeUseBgBorders }) => css`
    border-right: 1px solid;
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-color: ${colors.GrayScale_100};
    border-top-color: transparent;
    // -ms-ime-align needs to define old Edge, which doesn't work properly with table borders layout
    // for Edge uses background gradient drawings instead of borders
    ${isEdgeUseBgBorders &&
        css`
            @supports (position: sticky) and (-ms-ime-align: auto) {
                border: none;
                background-image: linear-gradient(
                        to left,
                        ${colors.GrayScale_100},
                        ${colors.GrayScale_100} 1px,
                        transparent 1px
                    ),
                    linear-gradient(to top, ${colors.GrayScale_100}, ${colors.GrayScale_100} 1px, transparent 1px);
            }
        `}
    // remove bottom border to prevent delimiting with table.
    // Also footer will get top border so we remove border from tbody last column too (see lastRowStyles for details)
    ${StyledTbody} > ${StyledRow}:last-of-type > &,
    ${StyledTfoot} > ${StyledRow}:last-of-type > & {
        ${isEdgeUseBgBorders &&
            css`
                @supports (position: sticky) and (-ms-ime-align: auto) {
                    background-image: linear-gradient(
                        to left,
                        ${colors.GrayScale_100},
                        ${colors.GrayScale_100} 1px,
                        transparent 1px
                    );
                }
            `};
        border-bottom-color: transparent;
    }
    ${StyledTfoot} > ${StyledRow}:first-of-type > & {
        border-top-color: ${colors.GrayScale_100};
        ${isEdgeUseBgBorders &&
            css`
                @supports (position: sticky) and (-ms-ime-align: auto) {
                    background-image: linear-gradient(
                            to bottom,
                            ${colors.GrayScale_100},
                            ${colors.GrayScale_100} 1px,
                            transparent 1px
                        ),
                        linear-gradient(to top, ${colors.GrayScale_100}, ${colors.GrayScale_100} 1px, transparent 1px),
                        linear-gradient(to left, ${colors.GrayScale_100}, ${colors.GrayScale_100} 1px, transparent 1px);
                    border-top: none;
                }
            `};
    }
`;

const StyledCell = styled.td`
    ${(props) => ({ colStyle, rightSlot, disabledLastHighRow, css: _css } = props) => css`
        background-color: inherit;
        font-weight: inherit;
        line-height: 1;
        position: relative;
        padding: 19px 28px 12px;
        ${StyledThead} > ${StyledRow}:nth-of-type(2) & {
            padding-top: 26px;
            padding-bottom: 17px;
        }
        ${rightSlot &&
            css`
                padding-right: 35px;
            `}
        ${bordersStyles(props)};
        ${!disabledLastHighRow && lastRowStyles};
        ${fixedStyles(props)};
        ${typeof colStyle === 'function' ? colStyle(props) : colStyle};
        ${applyEmotionStyle(_css, props)}
    `};
`;

const StyledResizer = styled.span`
    position: absolute;
    z-index: 5;
    top: 0;
    right: 0;
    bottom: 0;
    width: 6px;
    transform: translate(${({ lastCol }) => (lastCol ? '0' : '50%')});
`;

const Resizer = ({
    resizable,
    rightIndexPosition,
    resizingStates: { setResizingCols, setIsResizing, isResizing },
    lastCol,
    nextIndex
}) => {
    if (!resizable) return null;

    return (
        <StyledResizer
            role={'presentation'}
            lastCol={lastCol}
            onMouseEnter={() => !isResizing && setResizingCols([rightIndexPosition, nextIndex])}
            onMouseLeave={() => !isResizing && setResizingCols(null)}
            onMouseDown={() => setIsResizing(true)}
        />
    );
};

export { Resizer, StyledCell, ChildrenWrapper, Slot, TitleSorter, slotSorterWrapper };
