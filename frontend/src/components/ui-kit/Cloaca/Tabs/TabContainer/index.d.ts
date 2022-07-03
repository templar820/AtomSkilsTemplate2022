import * as React from 'react';
import { TabProps } from 'lib-ui/Tabs';

export interface TabContainerProps extends TabProps {
    /** Children of TabContainer */
    children?: React.ReactNode;
    /** For title */
    tab: string;
}

declare const TabContainer: React.ComponentType<TabContainerProps>;

export default TabContainer;
