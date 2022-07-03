import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface TimeItemProps {
    /** Item object that consider hour/minute of second */
    item?: object | number | string;
    /** Defines is that item is active */
    isActive?: boolean;
    /** Defines is that item is disabled */
    disabled?: boolean;
    /** Custom styles ot item label */
    labelItemStyles?: EmotionStylesType;
    /** Custom styles ot item wrapper */
    listItemStyles?: EmotionStylesType;
    /** Pass ref to element */
    itemRef?: React.RefObject<HTMLElement>;
    /** Callback, fired then user click on item, func({ newValue }) */
    onClick?: (newValue: { newValue: number }) => void;
}

declare const TimeItem: React.ComponentType<TimeItemProps>;

export default TimeItem;
