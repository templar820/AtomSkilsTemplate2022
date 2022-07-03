import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { css, Global, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';
import { debounce } from 'lib-root/utils';
import { Portal, withColors } from 'lib-ui/utils';

const GlobalCursor = ({ isShown }) =>
    !isShown ? null : (
        <Global
            styles={css`
                body {
                    cursor: col-resize;
                }
            `}
        />
    );
const fadeInAnimation = keyframes`
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        `;
const fadeOutAnimation = keyframes`
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        `;

const StyledResizer = styled.div`
    position: absolute;
    top: ${({ topPosition }) => (topPosition !== undefined ? topPosition + 'px' : 0)};
    left: ${({ left }) => (left !== undefined ? left + 'px' : 'initial')};
    width: 1px;
    background: ${({ colors }) => colors.primary};
    height: ${({ wrapperHeight }) => wrapperHeight}px;
    pointer-events: none;
    ${({ ghost, isShown }) =>
        ghost
            ? css`
                  opacity: 0.2;
                  right: 0;
              `
            : css`
                  animation: ${isShown ? fadeInAnimation : fadeOutAnimation} 200ms ease forwards;
              `};
    &:after {
        content: '';
        width: 3px;
        height: ${({ headHeight }) => headHeight}px;
        background: ${({ colors }) => colors.primary};
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }
    ${({ resizerStyle, ...restProps }) => applyEmotionStyle(resizerStyle, restProps)};
`;

const computeCellWidth = (value) => {
    if (!isNaN(value)) {
        return Number(value);
    } else {
        if (value === 'auto') return 0;
        if (value === 'none') return Infinity;

        const split = value.split('px');
        return split.length > 1 ? Number(split[0]) : 0;
    }
};

const calcColValues = ({ cell, currentIndex }, minCellWidths, maxCellWidths, diff) => {
    const colWidth = cell ? cell.offsetWidth : 0;

    if (colWidth) {
        const colMinWidth = computeCellWidth(minCellWidths[currentIndex]);
        const colMaxWidth = computeCellWidth(maxCellWidths[currentIndex]);
        const estimateWidth = colWidth + diff;
        if (estimateWidth < colMinWidth) {
            diff = colMinWidth - colWidth;
        } else if (estimateWidth > colMaxWidth) {
            diff = colMaxWidth - colWidth;
        }
    }
    return [colWidth, diff];
};

const getDiff = (x, leftCol, rightCol, minCellWidths, maxCellWidths) => {
    const diff = x - leftCol.cell.getBoundingClientRect().right;

    const [leftColWidth, tempDiff] = calcColValues(leftCol, minCellWidths, maxCellWidths, diff);
    const [rightColWidth, finalDiff] = calcColValues(rightCol, minCellWidths, maxCellWidths, -tempDiff);
    return [-finalDiff, leftColWidth - finalDiff, rightColWidth + finalDiff];
};

const useResizeCreator = (leftCol, rightCol, minCellWidths, maxCellWidths, setWidths) =>
    useCallback(
        (x) => {
            const [diff, leftWidth, rightWidth] = getDiff(x, leftCol, rightCol, minCellWidths, maxCellWidths);

            if (diff !== 0) {
                setWidths((cellWidths) =>
                    cellWidths.map((width, index) => {
                        if (index === leftCol.index) return leftWidth;
                        if (index === rightCol.index) return rightWidth;
                        return width;
                    })
                );
            }
        },
        [leftCol, rightCol, minCellWidths, maxCellWidths, setWidths]
    );

const useMouseListener = (isResizing, resize, resizeOnSpot, setIsResizing, setResizingCols, setLeftPosition) => {
    const mouseMoveListener = useCallback(
        debounce(({ clientX }) => {
            setLeftPosition(clientX);
            if (resizeOnSpot) resize(clientX);
        }, 5),
        [resize, resizeOnSpot, setLeftPosition]
    );

    const mouseUpListener = useCallback(
        ({ clientX }) => {
            if (!resizeOnSpot) resize(clientX);
            setIsResizing(false);
            setResizingCols(null);
        },
        [resizeOnSpot, resize, setIsResizing, setResizingCols]
    );

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', mouseMoveListener);
            document.addEventListener('mouseup', mouseUpListener);
        }
        return () => {
            document.removeEventListener('mousemove', mouseMoveListener);
            document.removeEventListener('mouseup', mouseUpListener);
        };
    }, [isResizing]);
};

const getColObject = (index, currentIndexes, cells) => {
    const currentIndex = currentIndexes.indexOf(index);
    const cell = cells[currentIndex] || null;
    return { index, cell, currentIndex: currentIndex !== -1 ? currentIndex : null };
};

const useCellsGetter = (resizingCols, filteredColumnsMap, totalColumnsCount, tableRef) =>
    useMemo(() => {
        if (!resizingCols) return [{}, {}];

        const currentIndexes = new Array(totalColumnsCount)
            .fill('')
            .map((_, index) => index)
            .filter((index) => !filteredColumnsMap[index]);
        const { tHead: { rows: [{ cells = [] } = {}] = [] } = {} } = tableRef.current || {};

        return [
            getColObject(resizingCols[0], currentIndexes, cells),
            getColObject(resizingCols[1], currentIndexes, cells)
        ];
    }, [resizingCols, filteredColumnsMap, totalColumnsCount, tableRef.current]);

const useStartPosition = (resizingCols, leftCell, wrapperRef, setLeftPosition, setTopPosition) =>
    useEffect(() => {
        if (resizingCols && resizingCols.length && wrapperRef.current) {
            setTopPosition(wrapperRef.current.getBoundingClientRect().top);
            setLeftPosition(leftCell.getBoundingClientRect().right);
        }
    }, [resizingCols, leftCell, wrapperRef.current, setLeftPosition, setTopPosition]);

const useLimiter = (leftPosition, leftCol, rightCol, minCellWidths, maxCellWidths) =>
    useMemo(() => {
        if (leftCol.cell) {
            const [diff] = getDiff(leftPosition, leftCol, rightCol, minCellWidths, maxCellWidths);
            const result = diff + leftCol.cell.getBoundingClientRect().right;
            return result > 0 ? result : 0;
        } else {
            return null;
        }
    }, [leftPosition, leftCol, rightCol, minCellWidths, maxCellWidths]);

export const Resizer = withColors(
    ({
        resizingStates,
        tableRef,
        wrapperRef,
        totalColumnsCount,
        filteredColumnsMap,
        minCellWidths,
        maxCellWidths,
        setWidths,
        resizeOnSpot,
        ...restProps
    }) => {
        const { resizingCols, setResizingCols, isResizing, setIsResizing } = resizingStates;
        const [leftPosition, setLeftPosition] = useState(null);
        const [topPosition, setTopPosition] = useState(null);

        const [leftCol, rightCol] = useCellsGetter(resizingCols, filteredColumnsMap, totalColumnsCount, tableRef);

        const resize = useResizeCreator(leftCol, rightCol, minCellWidths, maxCellWidths, setWidths);

        useStartPosition(resizingCols, leftCol.cell, wrapperRef, setLeftPosition, setTopPosition);
        useMouseListener(isResizing, resize, resizeOnSpot, setIsResizing, setResizingCols, setLeftPosition);

        const left = useLimiter(leftPosition, leftCol, rightCol, minCellWidths, maxCellWidths);

        const isShown = Array.isArray(resizingCols) && resizingCols.length && left !== null;
        if (!isShown) return null;

        const { offsetHeight: wrapperHeight } = wrapperRef.current || {};
        const { tHead: { offsetHeight: headHeight } = {} } = tableRef.current || {};

        return (
            <>
                <Portal>
                    <GlobalCursor {...{ isShown }} />
                    <StyledResizer {...{ left, topPosition, wrapperHeight, headHeight, isShown, ...restProps }} />
                </Portal>
                {leftCol.cell && !resizeOnSpot && isResizing && (
                    <Portal node={leftCol.cell}>
                        <StyledResizer {...{ wrapperHeight, headHeight, isShown, ghost: true, ...restProps }} />
                    </Portal>
                )}
            </>
        );
    }
);

export default Resizer;
