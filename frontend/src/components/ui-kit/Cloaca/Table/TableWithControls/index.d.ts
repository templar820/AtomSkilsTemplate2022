import * as React from 'react';
import { TableProps } from '../Table';
import { EmotionStylesType } from 'lib-ui';

export type CheckedRowsType = {
    thead?: { [key: string]: boolean };
    tbody?: { [key: string]: boolean };
    tfoot?: { [key: string]: boolean };
};

export interface TableWithControlsProps extends TableProps {
    /** If set true, last page will be filled by previous page entries till entriesOnPage maximum reached */
    extendLastPage?: boolean;
    /** Defines caption shown next to tabs */
    tabsCaption?: React.ReactNode;
    /** Defines default rows count to display. Will override user set value if changes */
    entriesOnDisplay?: number;
    /** Defines whether it possible for the component to handle entriesOnDisplay internally */
    controlledEntriesOnDisplay?: boolean;
    /** Defines callback function fires on user changing entriesOnDisplay (tabs change). Receives new entries value */
    onEntriesOnDisplayChange?: (tab: string | number) => void;
    /** Defines per page tabs. If custom captions needed, pass object like this {10: 'caption 1', 15: 'caption 2'} */
    tabs?: Array<number> | { [key: number]: React.ReactNode };
    /** Defines active page for Paginator. Will override user set value if changes */
    activePage?: number;
    /** Defines whether it possible for the component to handle activePage internally */
    controlledActivePage?: boolean;
    /** Defines callback function fires on user changing active page. Receives new active page value */
    onActivePageChange?: (page: number) => void;
    /** Defines how many pages numbers shown in Paginator. Marginal and arrow numbers excluded */
    displayedPagesCount?: number;
    /** Overrides pages count normally calculated automatically.
     * In this case You probably need to fully control Table and override startEntry */
    pagesCount?: number;
    /** Defines whether Tabs should be show */
    showTabs?: boolean;
    /** Defines whether Paginator should be show */
    showPaginator?: boolean;
    /** Defines whether Table should contains controlling column at the start of the Table */
    addFirstCol?: boolean;
    /** Defines width for first column at the start of the Table*/
    firstColWidth?: number | string | 'auto';
    /** Defines whether Table should contains controlling column at the end of the Table */
    addLastCol?: boolean;
    /** Defines width for last column at the end of the Table*/
    lastColWidth?: number | string | 'auto';
    /** Defines min width for first column at the start of the Table */
    firstColMinWidth?: number | 'auto';
    /** Defines min width for last column at the end of the Table*/
    lastColMinWidth?: number | 'auto';
    /** Defines max width for first column at the start of the Table*/
    firstColMaxWidth?: number | 'none';
    /** Defines max width for last column at the end of the Table */
    lastColMaxWidth?: number | 'none';
    /** Defines whether it is possible to change the width of the first added column */
    changeWidthFirstCol?: boolean;
    /** Overrides cells for extra column at the start of the column.
     * It is possible to pass cells only for needed section. Other sections' cells will use default values */
    firstColCells?: {
        thead?: React.ReactNode;
        tbody?: React.ReactNode;
        tfoot?: React.ReactNode;
    };
    /** Overrides cells for extra column at the end of the column.
     * It is possible to pass cells only for needed section. Other sections' cells will use default values */
    lastColCells?: {
        thead?: React.ReactNode;
        tbody?: React.ReactNode;
        tfoot?: React.ReactNode;
    };
    /** Defines rows selection flag. If checking is uncontrolled, defines only initial flags.
     * Structure: { sections names, i.e. tbody: { row keys: boolean } } */
    checkedRows?: CheckedRowsType;
    /*Defines callback function fires on select row */
    onCheckedChange?: (
        newState: CheckedRowsType,
        change: {
            key: string;
            tableSection: 'tbody' | 'thead' | 'tfoot';
            value: boolean;
            sumCell: boolean;
        }
    ) => void;
    /** Defines whether table should manage checking by itself or await props changes */
    isCheckingControlled?: boolean;
    /** Defines initial rows' check flag if it is not set in checkedRows. */
    defaultChecked?: boolean;
    /** Defines strategy of checkedRows using. If set true, rows not mentioned in checkedRows will receive default flag.
     * If set false, only rows in checkedRows will be used for flags setting. Useful for work with filters. */
    mergeCheckedRows?: boolean;
    /** Add loader component */
    isLoading?: boolean;
    /** Custom styles for Wrapper */
    wrapperStyle?: EmotionStylesType;
    /** Custom styles for Table's Wrapper */
    tableWrapperStyle?: EmotionStylesType;
    /** Custom styles for ControlsWrapper */
    controlsWrapperStyle?: EmotionStylesType;
    /** Custom styles for Tabs Wrapper */
    tabsWrapperStyle?: EmotionStylesType;
    /** Custom styles for Tabs */
    tabsStyle?: EmotionStylesType;
    /** Custom styles for Pagination */
    paginationStyle?: EmotionStylesType;
}

declare const TableWithControls: React.ComponentType<TableWithControlsProps>;

export default TableWithControls;
