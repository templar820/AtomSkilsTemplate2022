import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';
import { EmptyStatesProps } from 'lib-root/components/utils/EmptyStates';

declare type FilterFunctionType = (rows: Array<React.ReactNode>) => Array<React.ReactNode>;

export interface TableProps {
    /** Defines sequential list of columns widths. Width might be number (eq to px), percent (like '30%') or 'auto' */
    cellWidths?: Array<number | string | 'auto'>;
    /** This value will be used if column width is not specified */
    defaultCellWidth?: number | string | 'auto';
    /** Defines sequential list of columns minimal widths */
    minCellWidths?: Array<number | 'auto'>;
    /** This value will be used if column minWidth is not specified  */
    defaultMinCellWidth?: number | 'auto';
    /** Defines sequential list of columns maximal widths. !!! APPLIED FOR RESIZING ONLY.
     * For proper result, please, mix with cellWidths */
    maxCellWidths?: Array<number | 'none'>;
    /** This value will be used if column maxWidth is not specified.  */
    defaultMaxCellWidth?: number | 'none';
    /** Defines sequential list of columns resizability.
     * Important: resizability, in this case, means possibility to change right border position of the column */
    resizableCols?: Array<boolean>;
    /** This value will be used if column resizability is not specified  */
    defaultResizable?: boolean;
    /** Defines whether cells widths change on resizer move (true) or resizer drop (false) */
    resizeOnSpot?: boolean;
    /** Defines whether rows should apply preset hover style */
    hoveringRows?: boolean;
    /** Defines sequential list of columns' cells styles. Styles are handling by emotion.
     * In case of using Table with colSpan attributes, consider to set styles directly to the Cell elements */
    colsStyles?: Array<EmotionStylesType>;
    /** Emotion styles for Table wrapper */
    wrapperStyle?: EmotionStylesType;
    /** emotion styles for the Cell's resizer (if there is one). Overrides resizer styles passed from Row */
    resizerStyle?: EmotionStylesType;
    /** Emotion styles for the Table */
    css?: EmotionStylesType;
    /** Defines how many rows could possibly be in the DOM at the same time */
    entriesOnDisplay?: number;
    /** Defines how many rows will be skipped to render starting from the top of the rows list in tbody */
    startEntry?: number;
    /** Defines list of filters that will be applied to the tbody rows.
     * Each filter receives rows array and index of this filter. Filter must return new rows list */
    filters?: Array<FilterFunctionType>;
    /** Defines list of compareFunctions that will be applied to the tbody rows */
    sorters?: Array<FilterFunctionType>;
    /** Defines list of indexes of columns, that will be filtered from each row */
    filteredColumns?: Array<Number>;
    /** Defines order of sorters applying. If filters have byColumn properties, 'ltr' and 'rtl' will order filters by
     * columns indexes. Also You may pass array of indexes which means sorting by given sorters indexes.
     * Sorters that didn't mentioned in array will be put in the end of output sorters list.
     * The last way - pass a function. It will receive sorters array and should return reordered sorters array.*/
    sortersOrder?: 'ltr' | 'rtl' | Array<number> | ((sorters: Array<FilterFunctionType>) => Array<FilterFunctionType>);
    /** Defines whether header must stick to the top of the table */
    fixedHeader?: boolean;
    /** Defines whether footer must stick to the top of the table */
    fixedFooter?: boolean;
    /** Defines whether first column must stick to the left side of the table */
    fixedFirstCol?: boolean;
    /** Defines whether last column must stick to the right side of the table */
    fixedLastCol?: boolean;
    /** Defines whether fixed columns should drop shadows if they scrolled away from edges */
    showHorizontalScrollShadows?: boolean;
    /** Defines whether EdgeHtml engine should draw borders through bg-property instead of normal borders.
     * Needed for sticky behavior for Edge, but resource-consuming. Turn off if no sticky layouts */
    isEdgeUseBgBorders?: boolean;
    /** Add loader component */
    isLoading?: boolean;
    /** render function for context menu component; */
    contextMenuComponent?: React.ComponentType;
    /** Defines whether cells widths could be changed by component itself (if set false) */
    isCellWidthsControlled?: boolean;
    /** Defines callback that will be fired when cellWidths changes */
    onCellWidthsChange?: (cellWidths: Array<number | string | 'auto'>) => void;
    /** Defines callback that will be fired when resizing starts */
    onResizeStart?: () => void;
    /** Defines callback that will be fired when resizing ends */
    onResizeEnd?: () => void;
    /** Defines whether cells should apply text-overflow: ellipsis; */
    disableEllipsisOverflow?: boolean;
    /** Defines if the last row should be high */
    disabledLastHighRow?: boolean;
    /** Defines custom props of nodata message, all props you may see in EmptyStates component */
    noDataProps?: EmptyStatesProps;
    /** Defines is no data message will be shown if table is empty. Defaults to `true` */
    showNoData?: boolean;
    /** Defines whether virtualization should be used and (optional) its settings. V12n affects props:
     * startEntry (default state), entriesOnDisplay (Infinite ignored - uses 10 default).
     * You may pass object instead of boolean with options { reserve, onChange }.
     * Reserve defines space (in px) before and after visible part, that will be filled with rows.
     * onChange fires on mounting new rows, receives current limit and startEntry.
     * If You have non-standard rows sizes, please, set 'height' prop for such rows. See Row for details */
    virtualization?:
        | boolean
        | {
              reserve?: number;
              onChange?: (params: { limit: number; startEntry: number }) => void;
              onScroll?: (params: { event: Event; startEntry: number; calcPureStartEntry: () => number }) => void;
          };
}

declare const Table: React.ComponentType<TableProps>;

export default Table;
