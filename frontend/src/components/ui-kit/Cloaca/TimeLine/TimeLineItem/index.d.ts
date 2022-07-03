import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface TimeLineItemProps {
    //** Alignment control if the alignment side is not specified by the parent */
    align?: 'left' | 'right';
    //** Color for icon or default circle */
    iconColor?: string;
    /** Icon name */
    icon?: string;
    //** Styles for wrapper */
    wrapperStyle?: EmotionStylesType;
    //** Mode */
    mode?: 'left' | 'right' | 'various';
    //** Position */
    position?: 'first' | 'last';
    //**  Children */
    children: any;
    //** Loading state */
    lastLoading?: boolean;
}

declare const TimeLineItem: React.ComponentType<TimeLineItemProps>;

export default TimeLineItem;
