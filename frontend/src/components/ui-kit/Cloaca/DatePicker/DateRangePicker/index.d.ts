import * as React from 'react';
import { DateRangeProps } from 'lib-ui/DatePicker';
import { DefinedRangeProps } from 'lib-ui/DatePicker';

export interface DateRangePickerProps extends DateRangeProps, Omit<DefinedRangeProps, 'onChange' | 'onPreviewChange'> {
    /** ClassName to wrapper component, and it set calendar to 'calendar_{className}', defined ranges to 'defined_{className}' */
    className?: string;
}

declare const DateRangePicker: React.ComponentType<DateRangePickerProps>;

export default DateRangePicker;
