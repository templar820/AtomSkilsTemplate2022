import * as React from 'react';
import { TabsProps } from 'lib-ui/Tabs';
import { EmotionStylesType } from 'lib-ui';

export interface TabsPanelProps extends TabsProps {
    /** Additional style for children component Tabs */
    classNameTabs?: string;
    /** Controlled or uncontrolled */
    isControlled?: boolean;
    /** Additional style for TabsPanelWrapper */
    tabsPanelWrapperStyle?: EmotionStylesType;
}

declare const TabsPanel: React.ComponentType<TabsPanelProps>;

export default TabsPanel;
