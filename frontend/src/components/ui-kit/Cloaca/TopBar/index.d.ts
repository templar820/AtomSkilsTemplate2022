import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface TopBarProps {
    /** Defines left items */
    leftItems?: Array<object>;
    /** Defines left menu title */
    leftMenuOverTitle?: string;
    /** Defines occurence */
    occurrence?: string;
    /** Defines right items */
    rightItems?: Array<object>;
    /** Defines component's additional styles */
    style?: EmotionStylesType;
    /** Defines component's additional css */
    css?: EmotionStylesType;
}

declare const TopBar: React.ComponentType<TopBarProps>;

export default TopBar;
