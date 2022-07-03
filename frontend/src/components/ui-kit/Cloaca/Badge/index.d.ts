import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

declare type PositionX = 'right' | 'middle' | 'left';
declare type PositionY = 'top' | 'middle' | 'bottom';

export interface BadgeProps {
    /** Color for badge text */
    color?: string;
    /** Color for badge background */
    bgColor?: string;
    /** Defines whether badge should be outlined */
    isOutlined?: boolean;
    /** Defines badge's horisontal position */
    badgePositionX?: PositionX;
    /** Defines badge's horisontal position */
    x?: PositionX;
    /** Defines badge's vertical position */
    badgePositionY?: PositionY;
    /** Defines badge's vertical position */
    y?: PositionY;
    /** Defines whether any node will be placed in the body of badge */
    children?: React.ReactNode;
    /** Style group: badge label */
    extendStyle?: EmotionStylesType;
    /** Style group: outer element */
    outerStyle?: EmotionStylesType;
    /** Defines allignment of inner items */
    alignItems?: string;
    /** Defines badge icon */
    icon?: React.ReactNode;
}

declare const Badge: React.ComponentType<BadgeProps>;

export default Badge;
