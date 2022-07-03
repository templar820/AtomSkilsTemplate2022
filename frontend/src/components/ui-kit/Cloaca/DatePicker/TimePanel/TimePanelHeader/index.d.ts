import * as React from 'react';

export interface TimePanelHeaderProps {
    /** Callback to click on arrows, func({ direction }) */
    onArrowClick?: (direction: { direction: string }) => void;
    /** Index of focused value */
    focusedPicker?: number;
    /** Number of visible value */
    visiblePickers?: number;
    /** Array with values of time/date */
    timeValues?: Array<number>;
    /** Colors obj */
    colors?: object;
    /** Date-fns options */
    dateOptions?: object;
    /** Hide arrows mode */
    hideArrows?: boolean;
    /** Label of left arrow btn */
    prevLabel?: string;
    /** Label of right arrow btn */
    nextLabel?: string;
    /** Format for time view in header */
    dateTimeFormat?: string;
    /** Saves the number of the selected item */
    onFocusElement?: (elNum: { elNum: number }) => void;
    /** Focusing on an item using buttons */
    timePanelElementChoice?: (props: object) => void;
}

declare const TimePanelHeader: React.ComponentType<TimePanelHeaderProps>;

export default TimePanelHeader;
