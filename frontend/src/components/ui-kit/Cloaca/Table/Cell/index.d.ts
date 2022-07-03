import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';
import { SorterProps } from '../Sorter';

export interface CellProps {
    /** defines number of columns cell will be spanned to */
    colSpan?: number;
    /** emotion styles for the Cell */
    css?: EmotionStylesType;
    /** defines whether cell should apply text-overflow: ellipsis */
    disableEllipsisOverflow?: boolean;
    /** defines value that will be used for sorting and filtering instead of children */
    filtersValue?: React.ReactNode;
    /** defines content of  cell's left slot*/
    leftSlot?: React.ReactNode;
    /** defines content of  cell's left slot*/
    rightSlot?: React.ReactNode;
    /** defines number of rows cell will be spanned to */
    rowSpan?: number;
    /** defines whether cell will be shown for checking at the ColFilter component */
    showInColFilter?: boolean;
    /** defines whether click on cell should trigger column sorting (for th only) */
    sortOnClick?: boolean;
    /** props that will be passed to the Sorter component (if sortOnClick is true) */
    sorterProps?: SorterProps;
}

declare const Cell: React.ComponentType<CellProps>;

export default Cell;
