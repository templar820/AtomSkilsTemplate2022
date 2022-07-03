import * as React from 'react';

export interface PortalWithStateProps {
    /** Defines text or any node that will be placed in a body of the component */
    children: () => React.ReactNode;
    /** Defines whether it's open by default */
    defaultOpen?: boolean;
    /** Defines node */
    node?: any;
    /** Defines whether component should be closed on escape press */
    closeOnEsc?: boolean;
    /** Defines whether component should be closed on click outside */
    closeOnOutsideClick?: boolean;
    /** Callback that fires on open */
    onOpen?: () => void;
    /** Callback that fires on close */
    onClose?: () => void;
}

declare const PortalWithState: React.ComponentType<PortalWithStateProps>;

export default PortalWithState;
