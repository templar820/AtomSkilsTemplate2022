import * as React from 'react';
import { CalendarProps } from 'lib-ui/DatePicker';
import { DatePickerRangeShape } from 'lib-ui';

declare type DateRangeOnChange = (
    range: { range1: object; range2: object; rangeKey: string },
    isSingleValue: boolean
) => void;

export interface DateRangeProps extends Omit<CalendarProps, 'onChange'> {
    /** Callback on pickup range, func({range: {range1, range2, rangeKey, ....}, isSingleValue}) */
    onChange?: DateRangeOnChange;
    /** Callback fired then client pick new range (if multiply ranges), or start pick new, func({range: [rangesIndex, rangeItemIndex]}) */
    onRangeFocusChange?: (range: { range: Array<number> }) => void;
    /** className to Calendar component */
    className?: string;
    /** Defaults/controlled ranges obj, [{ startDate, endDate, color, key, autoFocus, disabled, showDateDisplay}] */
    ranges?: Array<DatePickerRangeShape>;
    /** if set to true, then Calendar move to start range month */
    moveRangeOnFirstSelection?: boolean;
}

declare const DateRange: React.ComponentType<DateRangeProps>;

export default DateRange;
