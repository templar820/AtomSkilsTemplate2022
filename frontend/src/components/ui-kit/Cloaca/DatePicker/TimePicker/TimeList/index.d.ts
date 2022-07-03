import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

declare type TimePanelKeyControl = (data: {
    event: React.MouseEvent;
    activeItem: string | number;
    onItemClick: (newValue: { newValue: number }) => void;
}) => void;
export interface TimeListProps {
    /** Emotion styles applied to the wrapper of component. Overrides default. */
    wrapperStyle?: EmotionStylesType;
    /** Emotion styles applied to the list wrapper of component. Overrides default. */
    listWrapperStyles?: EmotionStylesType;
    /** Defines height of TimePicker */
    maxNumberOfVisibleOptions?: number;
    /** Array with disabled items */
    disabledItems?: Array<string | number>;
    /** Defines whether show disabled items or not */
    hideDisabledOptions?: boolean;
    /** All time values in list */
    items?: Array<string | number>;
    /** Current active item of time */
    activeItem?: string | number;
    /** Callback fired then user click on one of item in list, to set it active , func({ newValue })*/
    onItemClick?: (newValue: { newValue: number }) => void;
    /** Extract the listener key from the rest */
    onFocus?: () => void;
    /** Controlling a component using buttons */
    timePanelKeyControl?: TimePanelKeyControl;
}

declare const TimeList: React.ComponentType<TimeListProps>;

export default TimeList;
