import React, { useState, useEffect, useMemo, useCallback, useLayoutEffect, useRef } from 'react';
import { isEqual, useRefCallback, useResizeObserver, useStateController, useObjectMemo } from 'lib-root/utils';

const filterList = (list, filteredMap) => list.filter((_, index) => !filteredMap[index]);
const fillList = (count, widthsList, filler) =>
    [...new Array(count)].map((_, index) => (widthsList[index] !== undefined ? widthsList[index] : filler));
const useFillListMemo = (count, filteredMap, list, filler) =>
    useMemo(() => {
        const filledList = fillList(count, list, filler);
        const filteredList = filterList(filledList, filteredMap);
        return [filteredList, filledList];
    }, [count, list, filler]);

const useResizerStates = (onResizeStart, onResizeEnd) => {
    // make it this way to prevent too frequent invalidation of useCallback
    const onResizeStartRef = useRef(onResizeStart);
    onResizeStartRef.current = onResizeStart;
    const onResizeEndRef = useRef(onResizeEnd);
    onResizeEndRef.current = onResizeEnd;

    const [resizingCols, setResizingCols] = useState(null);
    const [isResizing, setIsResizing] = useState(false);
    const seIsResizingWithCallback = useCallback(
        (newValue) => {
            setIsResizing(() => {
                const callback = (newValue ? onResizeStartRef : onResizeEndRef).current;
                if (callback) callback();
                return newValue;
            });
        },
        [setIsResizing]
    );
    return useObjectMemo({ resizingCols, setResizingCols, isResizing, setIsResizing: seIsResizingWithCallback });
};

const splitChildren = (children) =>
    Object.assign(
        ...React.Children.map(
            children,
            ({ type: { tableSection }, props: { children } }) => {
                return { [tableSection]: children };
            },
            null
        )
    );
const filterRows = (grandchildren, filters) =>
    !filters.length
        ? grandchildren
        : {
              ...grandchildren,
              tbody: filters.reduce((rows, filter, index) => filter(rows, index), grandchildren.tbody)
          };
const filterCols = (grandchildren, filteredColumnsMap, totalColumnsCount) => {
    let columnsCount = 0;

    const filteredGrandchildren = Object.assign(
        ...Object.keys(grandchildren).map((section) => {
            const rows = React.Children.map(
                grandchildren[section],
                (row) => {
                    const { children } = row.props || {};
                    const childrenArray = React.Children.toArray(children);
                    const filteredChildren = !filteredColumnsMap.length
                        ? childrenArray
                        : childrenArray.filter(({ props: { index } = {} }) => !filteredColumnsMap[index]);
                    if (filteredChildren.length > columnsCount) columnsCount = filteredChildren.length;
                    return { ...row, props: { ...row.props, children: filteredChildren } };
                },
                null
            );
            return { [section]: rows };
        })
    );
    if (!filteredColumnsMap.length) columnsCount = totalColumnsCount;

    return [filteredGrandchildren, columnsCount];
};
const higherSort = (a, b, sorters, index) => {
    try {
        return sorters[index](a, b) || (sorters[index + 1] && higherSort(a, b, sorters, index + 1));
    } catch (e) {
        console.error(e);
        return 0;
    }
};
const reorderSorters = (sortersOrder, sorters) => {
    switch (true) {
        case sortersOrder === 'ltr':
            return [...sorters].sort((a, b) => a['byColumn'] - b['byColumn']);
        case sortersOrder === 'rtl':
            return [...sorters].sort((a, b) => b['byColumn'] - a['byColumn']);
        case Array.isArray(sortersOrder):
            const orderedPart = sortersOrder.map((position) => sorters[position]);
            const otherSorters = sorters.filter((sorter, index) => !sortersOrder.includes(index));
            return [...orderedPart, ...otherSorters].filter((sorter) => !!sorter);
        case typeof sortersOrder === 'function':
            return sortersOrder(sorters);
        default:
            return sorters;
    }
};
const sortRows = (grandchildren, sorters, sortersOrder) => {
    if (!sorters.length) return grandchildren;
    const reorderedSorters = reorderSorters(sortersOrder, sorters);
    return !reorderedSorters.length
        ? grandchildren
        : {
              ...grandchildren,
              tbody: [...grandchildren.tbody].sort((a, b) => higherSort(a, b, reorderedSorters, 0))
          };
};

/**
 * Returns current state and then decreases 'rowSpan' field of each child of 'spans'
 * @param spans - {{[index]: {colSpan, rowSpan}, ...}}
 * @returns {{[index]: {colSpan, rowSpan}, ...}}
 */
const decreaseRowSpans = (spans = {}) => {
    const prevState = { ...spans };

    for (let index in spans) {
        spans[index].rowSpan--;
        if (spans[index].rowSpan <= 1) delete spans[index];
    }

    return prevState;
};

const indexColumns = (grandchildren) => {
    let columnsCount = 0;
    const spans = {};

    // looping table sections
    const indexedGrandchildren = Object.assign(
        ...Object.keys(grandchildren).map((grandchild) => ({
            // mapping rows
            [grandchild]: React.Children.map(
                grandchildren[grandchild],
                (row) => {
                    const { children = [] } = row.props || {};
                    const cells = React.Children.toArray(children);
                    const _spans = decreaseRowSpans(spans);

                    // mapping cells:
                    const { indexedCells, colIndex: rowColumnsCount } = cells.reduce(
                        ({ indexedCells, colIndex }, cell) => {
                            const { rowSpan = 1, colSpan = 1 } = cell.props || {};
                            let modifier = 0;

                            if (_spans[colIndex]) {
                                modifier = _spans[colIndex].colSpan || 0;
                            }

                            const resultIndex = modifier + colIndex;

                            if (rowSpan > 1) spans[resultIndex] = { rowSpan, colSpan };

                            const resultCell = React.cloneElement(cell, { index: resultIndex });

                            return { indexedCells: [...indexedCells, resultCell], colIndex: resultIndex + colSpan };
                        },
                        { indexedCells: [], colIndex: 0 }
                    );

                    // update columnsCount
                    if (rowColumnsCount > columnsCount) columnsCount = rowColumnsCount;

                    return React.cloneElement(row, null, indexedCells);
                },
                null
            )
        }))
    );

    return { totalColumnsCount: columnsCount, indexedGrandchildren };
};

const useGrandchildrenPreparing = (children, filters, sorters, sortersOrder, filteredColumnsMap) =>
    useMemo(() => {
        {
            const grandchildren = splitChildren(children);
            const { totalColumnsCount, indexedGrandchildren } = indexColumns(grandchildren);
            const filteredGrandchildren = filterRows(indexedGrandchildren, filters);
            const [colFilteredGrandchildren, columnsCount] = filterCols(
                filteredGrandchildren,
                filteredColumnsMap,
                totalColumnsCount
            );
            const sortedGrandchildren = sortRows(colFilteredGrandchildren, sorters, sortersOrder);
            // const { columnsCount, indexedGrandchildren } = indexColumns(sortedGrandchildren);
            return {
                grandchildren: sortedGrandchildren,
                allGrandchildren: grandchildren,
                totalColumnsCount,
                columnsCount
            };
        }
    }, [children, filters, sorters, sortersOrder, filteredColumnsMap]);

const getScrolls = (
    { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth },
    [fixedHeader, fixedFooter, fixedFirstCol, fixedLastCol]
) => ({
    top: !!(scrollTop && fixedHeader),
    right: !!(fixedLastCol && scrollWidth - clientWidth - scrollLeft),
    bottom: !!(scrollHeight - clientHeight - scrollTop && fixedFooter),
    left: !!(fixedFirstCol && scrollLeft)
});

const useScrollDeterminer = (...fixedPositions) => {
    const { ref: wrapperRef, initRef: setWrapperRef } = useRefCallback();
    const [isScrolled, setIsScrolled] = useState({
        top: false,
        right: false,
        bottom: false,
        left: false
    });
    const handleScroll = useCallback(
        () =>
            setIsScrolled((state) => {
                const newState = getScrolls(wrapperRef.current, fixedPositions);
                return isEqual(state, newState) ? state : newState;
            }),
        [wrapperRef.current, ...fixedPositions]
    );

    const shouldListen = fixedPositions.some((position) => position);

    // check scrolls when table resized
    useResizeObserver({ ref: shouldListen ? wrapperRef : { current: null }, callback: handleScroll });
    // check scrolls when table scrolled
    useEffect(() => {
        if (wrapperRef.current && shouldListen) {
            handleScroll();

            wrapperRef.current.addEventListener('scroll', handleScroll);
            return () => wrapperRef.current.removeEventListener('scroll', handleScroll);
        }
    }, [wrapperRef.current, handleScroll]);

    return { setWrapperRef, wrapperRef, isScrolled };
};

const useRowsOffsetsGetter = ({ current: table }) => {
    const [heights, setHeights] = useState([]);
    useLayoutEffect(() => {
        if (table) {
            const rows = Array.prototype.slice.call(table.querySelectorAll('tr'));
            const newHeights = rows.map((row) => row.offsetHeight);
            setHeights(isEqual(newHeights, heights) ? heights : newHeights);
        }
    });

    return useMemo(() => {
        const tops = heights.reduce((result, height, index) => [...result, result[index] + height], [0]);
        const bottoms = tops.map((item) => tops[tops.length - 1] - item);
        return {
            tops,
            bottoms
        };
    }, [heights]);
};

const useFilteredColumnsController = (propFilteredColumns, colFilters, callback, isControlled) => {
    const value = useMemo(() => {
        if (!Array.isArray(colFilters)) {
            return propFilteredColumns || [];
        } else {
            return colFilters.reduce((result, { compare }) => {
                if (result.indexOf(compare) === -1) result.push(compare);
                return result;
            }, []);
        }
    }, [propFilteredColumns, colFilters]);

    const { value: filteredColumns, handler: setFilteredColumns } = useStateController({
        value,
        callback,
        isControlled
    });
    const filteredColumnsMap = useMemo(
        () =>
            filteredColumns.reduce((map, columnIndex) => {
                map[columnIndex] = true;
                return map;
            }, []),
        [filteredColumns]
    );
    return [filteredColumnsMap, filteredColumns, setFilteredColumns];
};

export {
    useResizerStates,
    useScrollDeterminer,
    useGrandchildrenPreparing,
    filterList,
    useFillListMemo,
    indexColumns,
    useRowsOffsetsGetter,
    useFilteredColumnsController
};
