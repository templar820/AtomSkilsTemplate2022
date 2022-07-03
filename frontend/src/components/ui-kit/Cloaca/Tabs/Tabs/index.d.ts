import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface TabsProps {
    /** Defines component's active tab */
    activeTab?: string | number;
    /** Defines component's template */
    template?: 'tiles' | 'underline' | 'custom';
    /** Defines tabs template config */
    tabsTemplateConfig?: object | (() => void);
    /** Defines tab template config */
    tabTemplateConfig?: object | (() => void);
    /** Defines component's additional className */
    className?: string;
    /** Defines tabs that will be placed in a body of the component */
    children: Array<React.ReactNode>;
    /** Defines component's additional css */
    css?: EmotionStylesType;
    /** Defines callback function fires on user changing tab, func(tab) */
    onTabChange?: (tab: number | string) => void;
}

declare const Tabs: React.ComponentType<TabsProps>;

export default Tabs;
