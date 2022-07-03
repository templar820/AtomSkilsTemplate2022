import * as React from 'react';
import { EmotionStylesType, DatePickerRangeShape, DatePickerPreview, TimePanelCall } from 'lib-ui';

export interface DayCellProps {
    /** Date value for this cell */
    day: object;
    /** Date value of selected date  */
    date?: object;
    /** Array with all selected ranges, [{ startDate, endDate, color, key, autoFocus, disabled, showDateDisplay}] */
    ranges?: Array<DatePickerRangeShape>;
    /** Preview range */
    preview?: DatePickerPreview;
    /** Custom emotion styles to day label, if func - func(props) */
    valueStyle?: EmotionStylesType;
    /** Custom emotion styles to preview on day, if func - func(props) */
    previewStyle?: EmotionStylesType;
    /** Callback fires then preview change, func({ day }) */
    onPreviewChange?: (day: { day: object }) => void;
    /** If true when it shows what this day is not interactive */
    disabled?: boolean;
    /** If true when it shows what this day is not in this month */
    isPassive?: boolean;
    /** If true when it shows what this day is today */
    isToday?: boolean;
    /** If true when it shows what this day is in weekend */
    isWeekend?: boolean;
    /** If true when it shows what this day is monday */
    isStartOfWeek?: boolean;
    /** If true when it shows what this day is sunday */
    isEndOfWeek?: boolean;
    /** If true when it shows what this day is first day of month */
    isStartOfMonth?: boolean;
    /** If true when it shows what this day is last day of month */
    isEndOfMonth?: boolean;
    /** Color for date label */
    color?: string;
    /** Shows is calendar shows date or ranges */
    displayMode?: 'dateRange' | 'date';
    /** Callback fires then mouse down in day zone, func({ day }) */
    onMouseDown?: (day: { day: object }) => void;
    /** Callback fires then mouse up in day zone, func({ day }) */
    onMouseUp?: (day: { day: object }) => void;
    /** Callback fires then mouse enter to day zone, func({ day }) */
    onMouseEnter?: (day: { day: object }) => void;
    /** Callback fires then user call time choose , func({ event, day, displayMode, date, ranges }) */
    onTimePanelCall?: TimePanelCall;
    /** Defines is current calendar has time picker or not */
    withTime?: boolean;
    /** Object of date-fns options */
    dateOptions?: object;
    /** Defines is user change time or not */
    isTimeChange?: boolean | Array<any>;
}

declare const DayCell: React.ComponentType<DayCellProps>;

export default DayCell;
