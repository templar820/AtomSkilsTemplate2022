import * as React from 'react';
import { DatePickerRangeShape, DatePickerPreview } from 'lib-ui';

declare type ScrollData = {
    /** If set to true when infinity scroll enabled */
    enabled?: boolean;
    /** Month height in px */
    monthHeight?: number;
    /** Max month height in px */
    longMonthHeight?: number;
    /** Month width in px */
    monthWidth?: number;
    /** Calendar width in px */
    calendarWidth?: number;
    /** Calendar height in px */
    calendarHeight?: number;
};

export interface CalendarProps {
    /** If true when buttons of next/prev months showing */
    showMonthArrows?: boolean;
    /** If true when selects to month and year showing */
    showMonthAndYearPickers?: boolean;
    /** Array of disabled dates */
    disabledDates?: Array<object>;
    /** Min available date */
    minDate?: object;
    /** Max available date */
    maxDate?: object;
    /** Current date to show */
    date?: object;
    /** Callback fires then range change, func({ date }) */
    onChange?: (date: { date: object }) => void;
    /** Callback fires then preview change, func({ day }) */
    onPreviewChange?: (day: { day: object }) => void;
    /** Callback fired then client pick new range (if multiply ranges), or start pick new, func({range: [rangesIndex, rangeItemIndex]}) */
    onRangeFocusChange?: (range: { range: Array<number> }) => void;
    /** Date-fns locale */
    locale?: object;
    /** Date what showing right now in calendar */
    shownDate?: object;
    /** Callback fired when showDate change, func({ date }) */
    onShownDateChange?: (date: { date: object }) => void;
    /** Array with all selected ranges, [{ startDate, endDate, color, key, autoFocus, disabled, showDateDisplay}] */
    ranges?: Array<DatePickerRangeShape>;
    /** Preview range */
    preview?: DatePickerPreview;
    dateDisplayFormat?: string;
    /** Show which ranges are in focus */
    /** 0-index value represents which range of ranges is in focus */
    /** 1-index value represents if range is editing:
     * -- 0 - not editing (range selection is not started)
     * -- 1 - editing (one date of range selected) */
    focusedRange?: [number, number];
    /** Init to ranges are in focus */
    initialFocusedRange?: Array<number>;
    /** Number of shown months  */
    months?: number;
    /** ClassName to wrapper component to style by styled */
    className?: string;
    /** If true when all inputs of ranges not showing */
    showDateDisplay?: boolean;
    /** If true when time picker turn on */
    withTime?: boolean;
    /** If set to true when preview (hover effect of dates) showing */
    showPreview?: boolean;
    /** Mode of how to pick dates */
    displayMode?: 'dateRange' | 'date';
    /** Color for chosen date */
    color?: string;
    /** Callback fired when range updates after two dates chosen, func({ range }) */
    updateRange?: (range: { range: Array<object> }) => void;
    /** Object of infinity scroll settings */
    scroll?: ScrollData;
    /** Direction of infinity scroll */
    direction?: 'vertical' | 'horizontal';
    /** Render func witch change month/year selects and arrows, func({ focusedDate, changeShownDate, ...restProps }) */
    navigatorRenderer?: (props: object) => void;
    /** Array of colors for all ranges */
    rangeColors?: Array<string>;
    /** if set to true when selected ranges can be dragged */
    dragSelectionEnabled?: boolean;
    /** if set to true when wrapper position set to unset and this, flag show is here defined range or not */
    isDefinedRange?: boolean;
    /** Defines zIndex for selects */
    zIndex?: number | string;
    /** CallBack on time pick call before onChange, func({ range, date }) */
    onTimeChange?: (onTimeData: { range: Array<object>; date: object }) => void;
}

declare const Calendar: React.ComponentType<CalendarProps>;

export default Calendar;
