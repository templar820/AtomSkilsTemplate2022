import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface NotificationContainerProps {
    /** Defines horisontal position */
    horizontalPosition?: 'left' | 'right';
    /** Defines vertical position */
    verticalPosition?: 'top' | 'bottom';
    /** alias for horizontalPosition */
    x?: 'left' | 'right';
    /** alias for verticalPosition */
    y?: 'top' | 'bottom';
    /** Defines direction of component */
    direction?: 'column' | 'row';
    /** Defines whether component should be reversed */
    isReversed?: boolean;
    /** Defines padding of component */
    gap?: string | number;
    /** Defines additional className */
    className?: string;
    /** Defines additional component css */
    css?: EmotionStylesType;
    /** Defines whether closeAll should be shown */
    closeAll?: React.ReactNode;
    /** Defines number of notifications needed for closeAll to be shown */
    countForView?: number;
}

declare const NotificationContainer: React.ComponentType<NotificationContainerProps>;

export default NotificationContainer;
