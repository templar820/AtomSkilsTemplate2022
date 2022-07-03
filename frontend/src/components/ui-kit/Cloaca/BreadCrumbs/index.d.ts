import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface BreadCrumbsProps {
    /** size of entire component */
    size?: 'sm' | 'lg';
    /** items to show, example: [{title: 'test', link: '#'}] */
    items: Array<{ title: string; link: string }>;
    /** color to highlighted (last) component */
    lastItemColor?: string;
    /** Callback fire then not disabled link is clicked, func (item) */
    onLinkClick?: (item: React.ReactElement) => void;
    /** render function to redefine link component */
    linkComponent?: React.ReactElement;
    /** Style group: outer element*/
    wrapStyle?: EmotionStylesType;
    /** Style group: each link or text */
    itemStyle?: EmotionStylesType;
    /** Style group: icons between links */
    iconStyle?: EmotionStylesType;
    /** Define bounds of component */
    width?: string;
    /** Define bounds of component */
    height?: string;
}

declare const BreadCrumbs: React.ComponentType<BreadCrumbsProps>;

export default BreadCrumbs;
