import * as React from 'react';

export interface TimeDrawerProps {
    /** Defines is it need to close on data choose */
    closeOnOk?: boolean;
    /** Defines is drawer open or not */
    isOpen?: boolean;
    /** Defines is drawer open is under parents control */
    controlledOpen?: boolean;
    /** Callback on okBtn click, func({params, isOpen}) */
    onOk?: (onOkData: { params: object; isOpen: boolean }) => void;
}

declare const TimeDrawer: React.ComponentType<TimeDrawerProps>;

export default TimeDrawer;
