import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';
import { FieldProps } from 'lib-ui/Field';

export interface DatePickerFieldProps extends Omit<FieldProps, 'type' | 'value'> {
    /** Defines what type of DatePicker will be used */
    type?: 'date' | 'range' | 'rangePicker' | 'time';
    /** Defines if DatePicker's dropdown will be closed when date is selected */
    closeOnDateSelect?: boolean;
    /** Allows to close DatePicker's dropdown on double click on date */
    closeOnDoubleDateClick?: boolean;
    /** Defines will the Field react on user actions */
    disabled?: boolean;
    /** Default value for date type Picker */
    date?: object;
    /** Default values for range types Pickers, { startDate, endDate }*/
    range?: object;
    /** Defines callback that will be used on valid dates change, func(values) */
    onChange?: (values: object) => void;
    /** Defines callback that will be used when dropdown opens, func() */
    onOpen?: () => void;
    /** Defines callback that will be used when dropdown closes, func() */
    onClose?: () => void;
    /** Other props that should be implement to the Dropdown component */
    dropdownProps?: object;
    /** Other props that should be implement to the Picker component */
    pickerProps?: object;
    /** Activate clear button */
    isClearable?: boolean;
    /** Activate time mode */
    withTime?: boolean;
    /** Defines whether show hours */
    showHours?: boolean;
    /** Defines whether show minutes */
    showMinutes?: boolean;
    /** Defines whether show seconds */
    showSeconds?: boolean;
    /** Used to throw styles into a dropdown trigger */
    triggerStyle?: EmotionStylesType;
    /** Time format for TimePanel header */
    timePanelHeaderDateFormat?: string;
    /** Defines control or uncontrolled input */
    isControlled?: boolean;
}

declare const DatePickerField: React.ComponentType<DatePickerFieldProps>;

export default DatePickerField;
