import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface TimeLineProps {
    //** Alignment control over children */
    mode: 'left' | 'right' | 'various';
    //* Loading state */
    isLoading: boolean;
    //** Styles for wrapper */
    wrapperStyle: EmotionStylesType;
    //* Children */
    children: any;
}

declare const TimeLine: React.ComponentType<TimeLineProps>;

export default TimeLine;
