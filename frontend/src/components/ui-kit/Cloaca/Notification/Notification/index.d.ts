import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';
import { MouseEvent } from 'react';

export interface NotificationProps {
    /** Defines preset of component */
    preset?: 'success' | 'attention' | 'error' | 'custom';
    /** Defines color of component */
    notificationColor?: string;
    /** Defines icon of component */
    icon?: React.ReactNode;
    /** Defines text or any node that will be placed in a body of the component */
    children?: React.ReactNode;
    /** Defines whether component should be filled */
    isFilled?: boolean;
    /** Callback that will be fired on clicking notification's body
     * If notification is rendered by NotificationContainer, gets called with second argument -
     * callback to close notification if necessary
     * */
    onClick?: (event: MouseEvent, closeNotification: () => void) => void;
    /** Callback that will be fired on clicking notification's close icon */
    /** If returns `true` - notification won't be closed */
    onClose?: (event: MouseEvent) => void | true;
    /** Defines font-size */
    size?: string | number;
    /** Defines additional className */
    className?: string;
    /** Defines additional component css */
    css?: EmotionStylesType;
    /** time to live in the hidden state (ms) */
    ttl?: number;
}

declare const Notification: React.ComponentType<NotificationProps>;

export default Notification;
