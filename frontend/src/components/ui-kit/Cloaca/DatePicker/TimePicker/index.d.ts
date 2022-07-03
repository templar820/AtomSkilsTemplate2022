import * as React from 'react';
import { TimeListProps } from 'lib-ui/DatePicker/TimePicker/TimeList';
import { EmotionStylesType } from 'lib-ui';

export interface TimePickerProps extends Omit<TimeListProps, 'timePanelKeyControl'> {
    /** Data object current value to picker */
    value?: object;
    /** Emotion styles applied to the wrapper of component. Overrides default. */
    wrapperStyle?: EmotionStylesType;
    /** Emotion styles applied to the list wrapper of component. Overrides default. */
    listWrapperStyles?: EmotionStylesType;
    /** Callback fired then time change, func({ time }) */
    onChange?: (time: { time: object }) => void;
    /** Defines is component controlled or not */
    isControlled?: boolean;
    /** Defines whether show hours */
    showHours?: boolean;
    /** Defines whether show minutes */
    showMinutes?: boolean;
    /** Defines whether show seconds */
    showSeconds?: boolean;
    /** Defines whether show disabled items or not */
    hideDisabledOptions?: boolean;
    /** Array with disabled hour */
    disabledHours?: Array<number>;
    /** Array with disabled minutes */
    disabledMinutes?: Array<number>;
    /** Array with disabled seconds */
    disabledSeconds?: Array<number>;
    /** Defines height of TimePicker */
    maxNumberOfVisibleOptions?: number;
    /** Defines class to wrapper */
    className?: string;
    /** Saves the number of the selected item */
    onFocusElement?: (elNum: { elNum: number }) => void;
    /** Focusing on an item using buttons */
    timePanelElementChoice?: (event: { event: React.MouseEvent }) => void;
    /** Controlling a component using buttons */
    timePanelKeyControl?: (onClickOk: { onClickOk: () => void }) => void;
}

declare const TimePicker: React.ComponentType<TimePickerProps>;

export default TimePicker;
