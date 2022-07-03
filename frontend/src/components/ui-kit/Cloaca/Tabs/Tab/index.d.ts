import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface TabProps {
    /** Defines tab */
    tab?: string | number;
    /** Defines additional className */
    className?: string;
    /** Defines whether component is disabled */
    disabled?: boolean;
    /** Defines component's additional css */
    css?: EmotionStylesType;
}

declare const Tab: React.ComponentType<TabProps>;

export default Tab;
