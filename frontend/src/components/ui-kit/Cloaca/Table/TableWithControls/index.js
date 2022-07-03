import React, { useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Paginator from 'lib-ui/Paginator';
import Table from '../Table';

import { useStateController } from 'lib-root/utils';

import { Wrapper, BottomControlsWrapper, PerPageTabs } from './units';

import {
    getColumnsCount,
    getArrayWithAddedColumns,
    calcStartEntry,
    usePropsInsert,
    useCheckController,
    prepareVirtualization
} from './utils';

const TableWithControls = React.forwardRef(
    (
        {
            children: propChildren,
            extendLastPage,
            tabsCaption,
            tabs,
            entriesOnDisplay: propEntriesOnDisplay,
            controlledEntriesOnDisplay,
            onEntriesOnDisplayChange,
            activePage: propActivePage,
            controlledActivePage,
            onActivePageChange,
            displayedPagesCount,
            pagesCount: propPagesCount,
            showTabs,
            showPaginator,
            addLastCol,
            addFirstCol,
            firstColWidth,
            firstColMinWidth,
            firstColMaxWidth,
            lastColMinWidth,
            lastColMaxWidth,
            lastColWidth,
            defaultCellWidth,
            defaultMinCellWidth,
            defaultMaxCellWidth,
            resizableCols: propResizableCols,
            minCellWidths,
            maxCellWidths,
            firstColCells,
            lastColCells,
            changeWidthFirstCol,
            cellWidths,
            onCheckedChange,
            checkedRows,
            isCheckingControlled,
            defaultChecked,
            mergeCheckedRows,
            isLoading,
            wrapperStyle,
            tableWrapperStyle,
            controlsWrapperStyle,
            paginationStyle,
            tabsWrapperStyle,
            tabsStyle,
            startEntry: propStartEntry,
            virtualization: propVirtualization,
            ...restProps
        },
        ref
    ) => {
        const { value: entriesOnDisplay, handler: onTabChange } = useStateController({
            value: propEntriesOnDisplay,
            callback: onEntriesOnDisplayChange,
            isControlled: controlledEntriesOnDisplay
        });
        const { value: activePage, handler: onPageChange } = useStateController({
            value: propActivePage,
            callback: onActivePageChange,
            isControlled: controlledActivePage
        });
        // activePageRef needed only to deal with v12n, to make possible controlling scroll through Paginator
        // and also change activePage by scrolling.
        // Didn't hoist startEntry here and use ref instead of one more state cause of performance reasons
        const activePageRef = useRef(activePage);
        if (!propVirtualization) activePageRef.current = activePage;
        useEffect(() => {
            // Although we changing ref, it will affect render cause of state changing in useStateController
            activePageRef.current = propActivePage;
        }, [propActivePage]);

        const children = usePropsInsert({
            children: propChildren,
            addLastCol,
            addFirstCol,
            firstColCells,
            lastColCells
        });

        const columnsCount = useMemo(() => getColumnsCount(children), [children]);

        const updateCellWidths = getArrayWithAddedColumns(
            cellWidths,
            columnsCount,
            addFirstCol,
            addLastCol,
            firstColWidth,
            lastColWidth,
            defaultCellWidth
        );
        const updateCellMinWidths = getArrayWithAddedColumns(
            minCellWidths,
            columnsCount,
            addFirstCol,
            addLastCol,
            firstColMinWidth,
            lastColMinWidth,
            defaultMinCellWidth
        );
        const updateCellMaxWidths = getArrayWithAddedColumns(
            maxCellWidths,
            columnsCount,
            addFirstCol,
            addLastCol,
            firstColMaxWidth,
            lastColMaxWidth,
            defaultMaxCellWidth
        );
        const resizableCols = [...propResizableCols];
        if (addFirstCol) resizableCols.unshift(changeWidthFirstCol);

        const { allCheck, setAllCheck } = useCheckController(
            children,
            isCheckingControlled,
            checkedRows,
            defaultChecked,
            mergeCheckedRows,
            onCheckedChange
        );

        const virtualization = prepareVirtualization(propVirtualization, onPageChange, entriesOnDisplay);

        // We use render function here to calc startEntry based on calculations made in Table
        // Then we adjust its render with startEntry
        const renderFunction = ({ render, grandchildren }) => {
            const rowsCount = grandchildren.tbody ? grandchildren.tbody.length : 0;
            const pagesCount = propPagesCount === undefined ? Math.ceil(rowsCount / entriesOnDisplay) : propPagesCount;
            const startEntry =
                propStartEntry !== undefined
                    ? propStartEntry
                    : calcStartEntry(
                          activePageRef.current,
                          pagesCount,
                          rowsCount,
                          extendLastPage && !virtualization,
                          entriesOnDisplay
                      );
            // if filters cut more entries than current active page, use tha last possible page
            // it will be used only if activePage is NOT controlled
            const _activePage = pagesCount > activePage ? activePage : pagesCount;
            return (
                <Wrapper {...{ wrapperStyle }}>
                    {render({ startEntry })}
                    <BottomControlsWrapper {...{ showTabs, showPaginator, controlsWrapperStyle }}>
                        {showPaginator && (
                            <Paginator
                                activePage={controlledActivePage ? activePage : _activePage}
                                onPageChange={(newPage) => {
                                    activePageRef.current = newPage;
                                    onPageChange(newPage);
                                }}
                                {...{ pagesCount, displayedPagesCount, paginationStyle }}
                            />
                        )}
                        {showTabs && (
                            <PerPageTabs
                                {...{ tabsCaption, tabs, onTabChange, entriesOnDisplay, tabsWrapperStyle, tabsStyle }}
                            />
                        )}
                    </BottomControlsWrapper>
                </Wrapper>
            );
        };

        return (
            <Table
                {...{
                    entriesOnDisplay,
                    ref,
                    isLoading,
                    cellWidths: updateCellWidths,
                    minCellWidths: updateCellMinWidths,
                    maxCellWidths: updateCellMaxWidths,
                    allCheck,
                    setAllCheck,
                    renderFunction,
                    virtualization,
                    resizableCols,
                    wrapperStyle: tableWrapperStyle,
                    ...restProps
                }}>
                {children}
            </Table>
        );
    }
);

TableWithControls.displayName = 'TableWithControls';
TableWithControls.propTypes = {
    ...Table.propTypes,
    /** If set true, last page will be filled by previous page entries till entriesOnPage maximum reached */
    extendLastPage: PropTypes.bool,
    /** Defines caption shown next to tabs */
    tabsCaption: PropTypes.node,
    /** Defines default rows count to display. Will override user set value if changes */
    entriesOnDisplay: PropTypes.number,
    /** Defines whether it possible for the component to handle entriesOnDisplay internally */
    controlledEntriesOnDisplay: PropTypes.bool,
    /** Defines callback function fires on user changing entriesOnDisplay (tabs change). Receives new entries value */
    onEntriesOnDisplayChange: PropTypes.func,
    /** Defines per page tabs. If custom captions needed, pass object like this {10: 'caption 1', 15: 'caption 2'} */
    tabs: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    /** Defines active page for Paginator. Will override user set value if changes */
    activePage: PropTypes.number,
    /** Defines whether it possible for the component to handle activePage internally */
    controlledActivePage: PropTypes.bool,
    /** Defines callback function fires on user changing active page. Receives new active page value */
    onActivePageChange: PropTypes.func,
    /** Defines how many pages numbers shown in Paginator. Marginal and arrow numbers excluded */
    displayedPagesCount: PropTypes.number,
    /** Overrides pages count normally calculated automatically.
     * In this case You probably need to fully control Table and override startEntry */
    pagesCount: PropTypes.number,
    /** Defines whether Tabs should be show */
    showTabs: PropTypes.bool,
    /** Defines whether Paginator should be show */
    showPaginator: PropTypes.bool,
    /** Defines whether Table should contains controlling column at the start of the Table */
    addFirstCol: PropTypes.bool,
    /** Defines width for first column at the start of the Table*/
    firstColWidth: PropTypes.number,
    /** Defines whether Table should contains controlling column at the end of the Table */
    addLastCol: PropTypes.bool,
    /** Defines width for last column at the end of the Table*/
    lastColWidth: PropTypes.number,
    /** Defines min width for first column */
    firstColMinWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
    /** Defines min width for last column */
    lastColMinWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
    /** Defines max width for first column */
    firstColMaxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['none'])]),
    /** Defines max width for last column */
    lastColMaxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['none'])]),
    /** Defines whether it is possible to change the width of the first added column */
    changeWidthFirstCol: PropTypes.bool,
    /** Overrides cells for extra column at the start of the column.
     * It is possible to pass cells only for needed section. Other sections' cells will use default values */
    firstColCells: PropTypes.shape({
        thead: PropTypes.node,
        tbody: PropTypes.node,
        tfoot: PropTypes.node
    }),
    /** Overrides cells for extra column at the end of the column.
     * It is possible to pass cells only for needed section. Other sections' cells will use default values */
    lastColCells: PropTypes.shape({
        thead: PropTypes.node,
        tbody: PropTypes.node,
        tfoot: PropTypes.node
    }),
    /** Defines rows selection flag. If checking is uncontrolled, defines only initial flags.
     * Structure: { sections names, i.e. tbody: { row keys: boolean } } */
    checkedRows: PropTypes.object,
    /* Defines callback function fires on select row. Receives newState of rows and exact change. */
    onCheckedChange: PropTypes.func,
    /** Defines whether table should manage checking by itself or await props changes */
    isCheckingControlled: PropTypes.bool,
    /** Defines initial rows' check flag if it is not set in checkedRows. */
    defaultChecked: PropTypes.bool,
    /** Defines strategy of checkedRows using. If set true, rows not mentioned in checkedRows will receive default flag.
     * If set false, only rows in checkedRows will be used for flags setting. Useful for work with filters. */
    mergeCheckedRows: PropTypes.bool,
    /** Add loader component */
    isLoading: PropTypes.bool,
    /** Custom styles for Wrapper */
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** Custom styles for Tables Wrapper */
    tableWrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** Custom styles for Controls Wrapper */
    controlsWrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** Custom styles for Tabs Wrapper */
    tabsWrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** Custom styles for Tabs */
    tabsStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** Custom styles for Pagination */
    paginationStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object])
};
TableWithControls.defaultProps = {
    ...Table.defaultProps,
    startEntry: undefined,
    extendLastPage: true,
    tabsCaption: 'Элементов на странице',
    entriesOnDisplay: 15,
    controlledEntriesOnDisplay: false,
    tabs: [10, 15, 20],
    activePage: 1,
    controlledActivePage: false,
    displayedPagesCount: 7,
    showTabs: true,
    showPaginator: true,
    addFirstCol: false,
    firstColWidth: 57,
    lastColWidth: 57,
    firstColMinWidth: Table.defaultProps.defaultMinCellWidth,
    lastColMinWidth: Table.defaultProps.defaultMinCellWidth,
    firstColMaxWidth: Table.defaultProps.defaultMaxCellWidth,
    lastColMaxWidth: Table.defaultProps.defaultMaxCellWidth,
    addLastCol: false,
    changeWidthFirstCol: false,
    lastColCells: {},
    isCheckingControlled: false,
    defaultChecked: false,
    mergeCheckedRows: true,
    isLoading: false
};

export default TableWithControls;
