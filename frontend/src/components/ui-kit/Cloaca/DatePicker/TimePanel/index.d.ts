import * as React from 'react';
import { TimePickerProps } from 'lib-ui/DatePicker';

export interface TimePanelProps extends TimePickerProps {
    /** Defines show btn to confirm or not */
    isOkBtn?: boolean;
    /** Defines call cb onClose then user click on ok btn or not */
    closeOnOk?: boolean;
    /** Defines show header or not */
    hideHeader?: boolean;
    /** Callback then user choose time and click on Ok btn, func({ time }) */
    onOk?: (time: { time: object }) => void;
    /** Callback then user choose time, func({ time }) */
    onChange?: (time: { time: object }) => void;
    /** Callback then user choose time and click on Ok btn and closeOnOk flag is true, func() */
    onClose?: () => void;
    /** Number of timePickers */
    pickersCount?: number;
    /** one Date object to pick time */
    value?: object;
    /** array of Date objects to pick time */
    values?: Array<object>;
    /** Index of focused picker (left in view) */
    focusedPicker?: number;
    /** Object with option to date-fns */
    dateOptions?: object;
    /** Object to pass props direct to TimePicker/Header */
    headerProps?: object;
    /** Label on Ok btn */
    okBtnLabel?: string;
    /** Time format for TimePanel header */
    timePanelHeaderDateFormat?: string;
}

declare const TimePanel: React.ComponentType<TimePanelProps>;

export default TimePanel;
