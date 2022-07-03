import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';
import { DatePickerRangeShape, DatePickerPreview, TimePanelCall } from 'lib-ui';

export interface MonthProps {
    /** Styles to wrapper */
    style?: EmotionStylesType;
    /** ClassName to wrapper component to style by styled */
    className?: string;
    /** Month to display now */
    month?: string;
    /** Drag range objects */
    drag?: object;
    /** Options to date-fns format and funcs */
    dateOptions?: object;
    /** Array of disabled dates */
    disabledDates?: Array<object>;
    /** Array of obj: {date: new Date(), ...rest } for customizing direct to day */
    /** Use memoized value to prevent unwanted rerenders */
    customDates?: Array<{ date: object; rest: object }>;
    /** Preview range */
    preview?: DatePickerPreview;
    /** Show hover effect on day or not */
    showPreview?: boolean;
    /** If true, infinity scroll on and set to vertical */
    isVertical?: boolean;
    /** Mode of how to pick dates */
    displayMode?: 'dateRange' | 'date';
    /** Min available date */
    minDate?: object;
    /** Max available date */
    maxDate?: object;
    /** Array with all selected ranges, [{ startDate, endDate, color, key, autoFocus, disabled, showDateDisplay}] */
    ranges?: Array<DatePickerRangeShape>;
    /** Show which ranges are in focus */
    focusedRange?: Array<number>;
    /** Callback fired then selected range start drag, func({ day }) */
    onDragSelectionStart?: (day: { day: object }) => void;
    /** Callback fired then selected range end drag, func({ day }) */
    onDragSelectionEnd?: (day: { day: object }) => void;
    /** Callback fired then selected range continue drag, func({ day }) */
    onDragSelectionMove?: (day: { day: object }) => void;
    /** Callback fired then user leave days area, func({ event }) */
    onMouseLeave?: (event: { event: React.MouseEvent }) => void;
    /** If true then showing week days */
    showWeekDays?: boolean;
    /** If true then showing month label on top of days and under week days */
    showMonthName?: boolean;
    /** Callback fires then user call time choose , func({ event, day, displayMode, date, ranges }) */
    onTimePanelCall?: TimePanelCall;
}

declare const Month: React.ComponentType<MonthProps>;

export default Month;
