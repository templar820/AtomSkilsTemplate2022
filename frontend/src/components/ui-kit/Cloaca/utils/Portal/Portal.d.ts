import * as React from 'react';
import { layers } from 'lib-root/layers';

declare type PortalRoleName = 'drawer' | 'modal' | 'notification' | 'dropdown' | 'tooltip' | 'default';

export interface PortalProps {
    children: React.ReactNode;
    /** if false - portal render to parent node */
    node?: React.ReactNode;
    /** Defines how must behave Portal in the stacking context */
    roleName?: PortalRoleName;
    /** If true - creates <div/> above the Portal with z-index = current 'LayersContext' value */
    hasLayerControl?: boolean;
}

declare const Portal: React.ComponentType<PortalProps>;

export default Portal;
