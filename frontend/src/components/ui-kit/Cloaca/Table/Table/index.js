import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { OutsideEventContainer } from 'react-on-outside-event';

import { useObjectMemo, useRefCallback, useStateController } from 'lib-root/utils';
import withColors from 'lib-ui/utils/withColors';
import { EmptyStates } from 'lib-root/components/utils';

import Thead from '../Thead';
import { ControlsContext } from '../utils';
import {
    useGrandchildrenPreparing,
    useScrollDeterminer,
    useFillListMemo,
    filterList,
    useResizerStates,
    useRowsOffsetsGetter,
    useFilteredColumnsController
} from './utils';

import { Wrapper, Resizer, Colgroup, LoaderComponentTable, ContextMenuWrapper } from './units';

const Table = React.forwardRef(
    (
        {
            className,
            children,
            colsStyles,
            cellWidths: propCellWidths,
            minCellWidths: propMinCellWidths,
            maxCellWidths: propMaxCellWidths,
            resizableCols: propResizableCols,
            defaultCellWidth,
            defaultMinCellWidth,
            defaultMaxCellWidth,
            defaultResizable,
            resizeOnSpot,
            onResizeStart,
            onResizeEnd,
            hoveringRows,
            entriesOnDisplay,
            startEntry = 0,
            filters: propFilters,
            sorters: propSorters,
            // colFilters will be deprecated in new versions. Use filteredColumns instead
            colFilters: propColFilters,
            filteredColumns: propFilteredColumns,
            sortersOrder,
            wrapperStyle,
            resizerStyle,
            fixedHeader,
            fixedFooter,
            fixedFirstCol,
            fixedLastCol,
            showHorizontalScrollShadows,
            isEdgeUseBgBorders,
            allCheck,
            setAllCheck,
            isLoading,
            onFiltersChange,
            onSortersChange,
            onColFiltersChange,
            contextMenuComponent,
            kebabTooltipProps,
            isCellWidthsControlled,
            onCellWidthsChange,
            disableEllipsisOverflow,
            disabledLastHighRow,
            noDataProps,
            showNoData,
            renderFunction,
            virtualization,
            ...restProps
        },
        ref
    ) => {
        const { ref: tableRef, initRef: setTableRef } = useRefCallback({ ref });
        const { wrapperRef, setWrapperRef, isScrolled } = useScrollDeterminer(
            fixedHeader,
            fixedFooter,
            fixedFirstCol,
            fixedLastCol
        );

        const { value: filters, handler: setFilters } = useStateController({
            value: propFilters,
            callback: onFiltersChange
        });
        const { value: sorters, handler: setSorters } = useStateController({
            value: propSorters,
            callback: onSortersChange
        });
        const { value: colFilters, handler: setColFilters } = useStateController({
            value: propColFilters,
            callback: onColFiltersChange
        });
        const { value: coords, handler: setCoords } = useStateController({
            value: null
        });
        const ContextMenu = contextMenuComponent;
        const handleClickOutside = () => {
            setCoords(null);
        };
        const [filteredColumnsMap, filteredColumns, setFilteredColumns] = useFilteredColumnsController(
            propFilteredColumns,
            propColFilters
        );

        const { grandchildren, allGrandchildren, totalColumnsCount, columnsCount } = useGrandchildrenPreparing(
            children,
            filters,
            sorters,
            sortersOrder,
            filteredColumnsMap
        );

        // expanding and updating cells (also min, max) widths and resizabilities from props
        const [, filledPropCellWidths] = useFillListMemo(
            totalColumnsCount,
            filteredColumnsMap,
            propCellWidths,
            defaultCellWidth
        );
        const [minCellWidths] = useFillListMemo(
            totalColumnsCount,
            filteredColumnsMap,
            propMinCellWidths,
            defaultMinCellWidth
        );
        const [maxCellWidths] = useFillListMemo(
            totalColumnsCount,
            filteredColumnsMap,
            propMaxCellWidths,
            defaultMaxCellWidth
        );

        const [resizableCols] = useFillListMemo(
            totalColumnsCount,
            filteredColumnsMap,
            propResizableCols,
            defaultResizable
        );

        const { value: filledCellWidths, handler: setWidths } = useStateController({
            value: filledPropCellWidths,
            callback: onCellWidthsChange,
            isControlled: isCellWidthsControlled
        });
        const cellWidths = useMemo(() => filterList(filledCellWidths, filteredColumnsMap), [
            filledCellWidths,
            filteredColumnsMap
        ]);

        // turn on/off Resizer if needed
        const resizingStates = useResizerStates(onResizeStart, onResizeEnd);

        // calculations for fixed rows to get sticky offsets
        const rowsOffsets = useRowsOffsetsGetter(tableRef);

        const controls = useObjectMemo({
            wrapperRef,
            setSorters,
            sorters,
            filters,
            setFilters,
            colFilters,
            setColFilters,
            filteredColumns,
            filteredColumnsMap,
            setFilteredColumns,
            resizingStates,
            allGrandchildren,
            allCheck,
            setAllCheck,
            isEdgeUseBgBorders
        });

        const resizerRender = () => (
            <Resizer
                {...{
                    resizingStates,
                    tableRef,
                    resizerStyle,
                    resizeOnSpot,
                    wrapperRef,
                    totalColumnsCount,
                    filteredColumnsMap,
                    minCellWidths,
                    maxCellWidths,
                    setWidths
                }}
            />
        );

        const render = ({ startEntry: startEntryOverride = startEntry, ...overrides } = {}) => (
            <>
                <LoaderComponentTable {...{ isLoading, wrapperRef }} />
                <ControlsContext.Provider value={controls}>
                    <Wrapper
                        {...{
                            wrapperStyle,
                            wrapperRef,
                            setWrapperRef,
                            grandchildren,
                            virtualization,
                            disabledLastHighRow,
                            setTableRef,
                            resizingStates,
                            resizerRender,
                            entriesOnDisplay,
                            ...restProps,
                            startEntry: startEntryOverride
                        }}>
                        <Colgroup {...{ columnsCount, cellWidths, minCellWidths, maxCellWidths }} />
                        {!grandchildren.thead && <Thead />}
                        {React.Children.map(children, (child) => {
                            const { tableSection } = child.type;
                            const { children, ...restChildProps } = child.props;
                            return React.cloneElement(
                                child,
                                {
                                    columnsCount,
                                    resizableCols,
                                    tableSection,
                                    hoveringRows,
                                    colsStyles,
                                    fixedHeader,
                                    fixedFooter,
                                    fixedFirstCol,
                                    fixedLastCol,
                                    isScrolled,
                                    showHorizontalScrollShadows,
                                    rowsOffsets,
                                    allCheck,
                                    setAllCheck,
                                    contextMenuComponent,
                                    kebabTooltipProps,
                                    coords,
                                    setCoords,
                                    disableEllipsisOverflow,
                                    disabledLastHighRow,
                                    noDataProps: tableSection === 'tbody' ? noDataProps : undefined,
                                    showNoData,
                                    ...overrides,
                                    ...restChildProps
                                },
                                grandchildren[tableSection]
                            );
                        })}
                    </Wrapper>
                </ControlsContext.Provider>
                {coords && (
                    <ContextMenuWrapper {...{ coords }}>
                        <OutsideEventContainer callback={handleClickOutside}>
                            <ContextMenu closeMenu={handleClickOutside} {...coords} />
                        </OutsideEventContainer>
                    </ContextMenuWrapper>
                )}
            </>
        );

        return renderFunction ? renderFunction({ render, grandchildren }) : render();
    }
);

Table.displayName = 'Table';
Table.propTypes = {
    /** Defines sequential list of columns widths. Width might be number (eq to px), percent (like '30%') or 'auto' */
    cellWidths: PropTypes.array,
    /** This value will be used if column width is not specified */
    defaultCellWidth: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.string]),
    /** Defines sequential list of columns minimal widths */
    minCellWidths: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])])),
    /** This value will be used if column minWidth is not specified  */
    defaultMinCellWidth: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    /** Defines sequential list of columns maximal widths. !!! APPLIED FOR RESIZING ONLY.
     * For proper result, please, mix with cellWidths */
    maxCellWidths: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['none'])])),
    /** This value will be used if column maxWidth is not specified.  */
    defaultMaxCellWidth: PropTypes.oneOfType([PropTypes.oneOf(['none']), PropTypes.number]),
    /** Defines sequential list of columns resizability.
     * Important: resizability, in this case, means possibility to change right border position of the column */
    resizableCols: PropTypes.array,
    /** This value will be used if column resizability is not specified  */
    defaultResizable: PropTypes.bool,
    /** Defines whether cells widths change on resizer move (true) or resizer drop (false) */
    resizeOnSpot: PropTypes.bool,
    /** Defines whether rows should apply preset hover style */
    hoveringRows: PropTypes.bool,
    /** Defines sequential list of columns' cells styles. Styles are handling by emotion.
     * In case of using Table with colSpan attributes, consider to set styles directly to the Cell elements */
    colsStyles: PropTypes.array,
    /** Emotion styles for Table wrapper */
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** emotion styles for the Cell's resizer (if there is one). Overrides resizer styles passed from Row */
    resizerStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles for the Table */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines how many rows could possibly be in the DOM at the same time */
    entriesOnDisplay: PropTypes.number,
    /** Defines how many rows will be skipped to render starting from the top of the rows list in tbody */
    startEntry: PropTypes.number,
    /** Defines list of filters that will be applied to the tbody rows.
     * Each filter receives rows array and index of this filter. Filter must return new rows list */
    filters: PropTypes.arrayOf(PropTypes.func),
    /** Defines list of compareFunctions that will be applied to the tbody rows */
    sorters: PropTypes.arrayOf(PropTypes.func),
    /** Defines list of indexes of columns, that will be filtered from each row */
    filteredColumns: PropTypes.arrayOf(PropTypes.number),
    /** Defines order of sorters applying. If filters have byColumn properties, 'ltr' and 'rtl' will order filters by
     * columns indexes. Also You may pass array of indexes which means sorting by given sorters indexes.
     * Sorters that didn't mentioned in array will be put in the end of output sorters list.
     * The last way - pass a function. It will receive sorters array and should return reordered sorters array.*/
    sortersOrder: PropTypes.oneOfType([PropTypes.oneOf(['ltr', 'rtl']), PropTypes.array, PropTypes.func]),
    /** Defines whether header must stick to the top of the table */
    fixedHeader: PropTypes.bool,
    /** Defines whether footer must stick to the top of the table */
    fixedFooter: PropTypes.bool,
    /** Defines whether first column must stick to the left side of the table */
    fixedFirstCol: PropTypes.bool,
    /** Defines whether last column must stick to the right side of the table */
    fixedLastCol: PropTypes.bool,
    /** Defines whether fixed columns should drop shadows if they scrolled away from edges */
    showHorizontalScrollShadows: PropTypes.bool,
    /** Defines whether EdgeHtml engine should draw borders through bg-property instead of normal borders.
     * Needed for sticky behavior for Edge, but resource-consuming. Turn off if no sticky layouts */
    isEdgeUseBgBorders: PropTypes.bool,
    /** Add loader component */
    isLoading: PropTypes.bool,
    /** Defines callback that will be fired when filters array changes */
    onFiltersChange: PropTypes.func,
    /** Defines callback that will be fired when sorters array changes */
    onSortersChange: PropTypes.func,
    /** Defines callback that will be fired when colFilters array changes */
    onColFiltersChange: PropTypes.func,
    /** render function for context menu component */
    contextMenuComponent: PropTypes.elementType,
    /** Defines whether cells widths could be changed by component itself (if set false) */
    isCellWidthsControlled: PropTypes.bool,
    /** Defines callback that will be fired when cellWidths changes */
    onCellWidthsChange: PropTypes.func,
    /** Defines callback that will be fired when resizing starts */
    onResizeStart: PropTypes.func,
    /** Defines callback that will be fired when resizing ends */
    onResizeEnd: PropTypes.func,
    /** Defines whether cells should apply text-overflow: ellipsis; */
    disableEllipsisOverflow: PropTypes.bool,
    /** Defines if the last row should be high */
    disabledLastHighRow: PropTypes.bool,
    /** Defines custom props of nodata message, all props you may see in EmptyStates component */
    noDataProps: PropTypes.shape({ ...EmptyStates.propTypes }),
    /** Defines is no data message will be shown if table is empty. Defaults to `true` */
    showNoData: PropTypes.bool,
    /** Defines whether virtualization should be used and (optional) its settings. V12n affects props:
     * startEntry (default state), entriesOnDisplay (Infinite ignored - uses 10 default).
     * You may pass object instead of boolean with options { reserve, onChange }.
     * Reserve defines space (in px) before and after visible part, that will be filled with rows.
     * onChange fires on mounting new rows, receives current limit and startEntry.
     * If You have non-standard rows sizes, please, set 'height' prop for such rows. See Row for details */
    virtualization: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};
Table.defaultProps = {
    cellWidths: [],
    defaultCellWidth: 'auto',
    minCellWidths: [],
    defaultMinCellWidth: 0,
    maxCellWidths: [],
    defaultMaxCellWidth: 'none',
    resizableCols: [],
    defaultResizable: false,
    resizeOnSpot: true,
    hoveringRows: true,
    colsStyles: [],
    entriesOnDisplay: Infinity,
    filters: [],
    sorters: [],
    filteredColumns: [],
    sortersOrder: 'ltr',
    fixedHeader: true,
    fixedFooter: false,
    fixedFirstCol: false,
    fixedLastCol: false,
    showHorizontalScrollShadows: true,
    isEdgeUseBgBorders: true,
    isLoading: false,
    isCellWidthsControlled: false,
    noDataProps: { text: '' },
    showNoData: true
};

export default withColors(Table);
