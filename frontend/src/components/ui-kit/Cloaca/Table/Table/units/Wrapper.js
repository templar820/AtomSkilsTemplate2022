import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';

import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';
import { setClassName } from 'lib-root/utils/styleMixins';

import Paper from 'lib-ui/Paper';

import { OffsetContext } from 'lib-ui/Table/utils';

const StyledWrapper = styled(Paper)`
    display: flex;
    max-height: 100%;
    font-size: 15px;
    overflow: auto;
    position: relative;
    z-index: 1;
    // smooth scrolling disabled cause of performance reasons
    //scroll-behavior: smooth;
    // overflow-anchor is targeting problem in Chrome - on remove elements from top, it tries to adjust scroll position
    // but it intended to be the same. It cost many hours to solve...
    overflow-anchor: none;
    ${({ wrapperMaxHeight }) => `max-height: ${wrapperMaxHeight ? wrapperMaxHeight + 'px' : '100%'}`};
    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    max-height: 100%;
    color: ${({ colors }) => colors.GrayScale_700};
    table-layout: fixed;
    user-select: ${({ resizingStates: { isResizing } = {} }) => (isResizing ? 'none' : 'auto')};
    ${({ height }) => height && `min-height: ${height}px`};
    ${({ css: _css, ...restProps }) => applyEmotionStyle(_css, restProps)};
`;

const ROW_HEIGHT = 48;
const EDGE_ROW_HEIGHT = 60;
const firstRowDefiner = (_, i) => i === 0;
const lastRowDefiner = (section, i) => section.length - 1 === i;
const addRowsSums = (currentSums = [], section = [], edgeRowDefiner) =>
    section.reduce(
        (result, cell, i) => {
            const lastSum = result[result.length - 1] || 0;
            let heightToAdd;

            const { props: { height } = {} } = section[i] || {};
            if (height !== undefined) {
                heightToAdd = height;
            } else {
                heightToAdd = edgeRowDefiner && edgeRowDefiner(section, i) ? EDGE_ROW_HEIGHT : ROW_HEIGHT;
            }

            result.push(lastSum + heightToAdd);
            return result;
        },
        [...currentSums]
    );
const useHeightsSumsCalculator = (virtualization, grandchildren, disabledLastHighRow) => {
    const { thead, tbody, tfoot } = grandchildren;
    return useMemo(() => {
        if (!virtualization) return null;

        let result = addRowsSums([], thead, firstRowDefiner);
        result = addRowsSums(result, tbody, !disabledLastHighRow && !tfoot && lastRowDefiner);
        return addRowsSums(result, tfoot, !disabledLastHighRow && !tbody && lastRowDefiner) || [];
    }, [thead, tbody, tfoot, virtualization, disabledLastHighRow]);
};

const useOffsetContextValue = (tbodyStartIndex, heightsSums, virtualization, limit) => {
    return useMemo(() => [tbodyStartIndex, limit, virtualization ? heightsSums[tbodyStartIndex - 1] : 0], [
        tbodyStartIndex,
        limit,
        virtualization ? heightsSums[tbodyStartIndex - 1] : 0
    ]);
};

const calcHeight = (heightsSums, virtualization, entriesOnDisplay, { thead = [], tbody = [] }) => {
    if (!virtualization || entriesOnDisplay === tbody.length) return 0;
    const temp = +heightsSums[thead.length + entriesOnDisplay - 1];
    return temp + heightsSums[heightsSums.length - 1] - heightsSums[heightsSums.length - 1];
};

const findHeightIndex = (heightsSums, height) => {
    if (height < heightsSums[0]) return 0;

    const lastSum = heightsSums[heightsSums.length - 1];
    if (height > lastSum) return heightsSums.length - 1;

    const approxIndex = Math.round(heightsSums.length * (height / lastSum));

    if (heightsSums[approxIndex] > height) {
        for (let i = approxIndex - 1; i >= 0; i--) {
            if (heightsSums[i] <= height) return i + 1;
        }
    } else {
        for (let i = approxIndex + 1; i < heightsSums.length; i++) {
            if (heightsSums[i] > height) return i;
        }
    }

    // if something went wrong
    return 0;
};

export const Wrapper = ({
    children,
    wrapperStyle,
    wrapperRef,
    setWrapperRef,
    grandchildren,
    disabledLastHighRow,
    virtualization: propVirtualization,
    startEntry: propStartEntry,
    entriesOnDisplay: propEntriesOnDisplay,
    setTableRef,
    resizingStates,
    className,
    resizerRender,
    ...restProps
}) => {
    // ignore fatal default value
    const entriesOnDisplay = !propVirtualization || Number.isFinite(propEntriesOnDisplay) ? propEntriesOnDisplay : 10;
    const virtualization = !!propVirtualization;
    const { reserve = 200, onChange, onScroll: onScrollCallback } =
        typeof propVirtualization === 'object' ? propVirtualization : {};

    const heightsSums = useHeightsSumsCalculator(virtualization, grandchildren, disabledLastHighRow);

    const [startEntry, setStartEntry] = useState(propStartEntry);

    useEffect(() => {
        if (virtualization) {
            setStartEntry((prev) => {
                if (prev !== propStartEntry && wrapperRef.current) {
                    let top = heightsSums[propStartEntry - 1];
                    if (top < 0 || !top) top = 0;
                    wrapperRef.current.scrollTop = top;
                }
            });
        } else {
            setStartEntry(propStartEntry);
        }
    }, [virtualization, propStartEntry]);

    const onScroll = useCallback(
        (event) => {
            if (virtualization) {
                let index = findHeightIndex(heightsSums, event.target.scrollTop - reserve);
                index = index < 0 ? 0 : index;
                if (onScrollCallback) {
                    onScrollCallback({
                        event,
                        startEntry: index,
                        calcPureStartEntry: () => findHeightIndex(heightsSums, event.target.scrollTop)
                    });
                }
                setStartEntry(index);
            }
        },
        [heightsSums, reserve, virtualization, onScrollCallback]
    );

    const theadLength = (grandchildren.thead || []).length;
    const tfootLength = (grandchildren.tfoot || []).length;

    let tbodyStartIndex = startEntry - (virtualization ? theadLength : 0);
    tbodyStartIndex = tbodyStartIndex > 0 ? tbodyStartIndex : 0;

    let limit = useMemo(() => {
        if (!virtualization) return entriesOnDisplay;
        const sum = heightsSums[tbodyStartIndex + entriesOnDisplay + tfootLength];
        if (sum === undefined) {
            return heightsSums.length - tbodyStartIndex;
        }
        const height = sum + reserve * 2;
        return findHeightIndex(heightsSums, height) - tbodyStartIndex + theadLength;
    }, [tbodyStartIndex, theadLength, tfootLength, entriesOnDisplay, reserve]);

    const offsetContextValue = useOffsetContextValue(tbodyStartIndex, heightsSums, virtualization, limit);

    const wrapperMaxHeight = calcHeight(heightsSums, virtualization, entriesOnDisplay, grandchildren);

    useEffect(() => {
        if (typeof onChange === 'function') onChange({ limit, startEntry });
        // to prevent fire effect if callback changed (possible to use ref, but faster)
        // eslint-disable-next-line
    }, [limit, startEntry]);

    return (
        <StyledWrapper size={5} {...{ wrapperStyle, wrapperMaxHeight }} ref={setWrapperRef} onScroll={onScroll}>
            <StyledTable
                {...{ ref: setTableRef, resizingStates, ...restProps }}
                height={heightsSums && heightsSums[heightsSums.length - 1]}
                className={setClassName({ props: { className }, name: 'table' })}>
                <OffsetContext.Provider value={offsetContextValue}>{children}</OffsetContext.Provider>
            </StyledTable>
            {resizerRender()}
        </StyledWrapper>
    );
};

export default Wrapper;
