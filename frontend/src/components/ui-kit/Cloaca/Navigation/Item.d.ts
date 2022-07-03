import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface ItemProps {
    /** Usually is a title of menu item */
    children?: React.ReactNode;
    /** Node with InlineIcon. But it is possible to set any node */
    icon?: React.ReactNode;
    /** Defines whether the item should be highlighted */
    active?: boolean;
    /** Defines highlighting color (used if item marked as active). By default inherit the value from Navigation */
    color?: string;
    /** Defines in which group of items the item will be placed  */
    position?: 'left' | 'right';
    /** Defines whether the icon should be visible. By default inherit the value from Navigation */
    showIcons?: boolean;
    /** The function that will be fired on click */
    onClick?: () => void;
    /** Emotion styles for the top level wrapper of the item */
    css?: EmotionStylesType;
}

declare const Item: React.ComponentType<ItemProps>;

export default Item;
