import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface NavigationProps {
    /** There must be Navigation Items */
    children?: React.ReactNode;
    /** Defines the height of the component */
    height?: string | number;
    /** Defines padding from left and right edges */
    horizontalPadding?: string | number;
    /** Defines color of the logo (not extraLogo) */
    logoColor?: string;
    /** Defines color of the items in right item group */
    colorRight?: string;
    /** Defines color of the items in left item group */
    colorLeft?: string;
    /** Defines callback on click on logo */
    onLogoClick?: () => void;
    /** Custom class for nav menu */
    menuClassName?: string;
    /** Force setting mobile mode. Undefined value means autodetect mobile appearance */
    isMobile?: boolean;
    /** Defines size of the MegaFon logo (not extraLogo) */
    logoFontSize?: number;
    /** Defines whether menu items in desktop version should be shown with icons */
    showIcons?: boolean;
    /** Defines extra logo which could be set right to the MegaFon logo */
    extraLogo?: React.ReactNode;
    /** Emotion styles applied to the top level wrapper of the component */
    css?: EmotionStylesType;
    /** Emotion styles applied to extraLogo if exist */
    extraLogoWrapperStyles?: EmotionStylesType;
    /** Instead of the logo will put the result of the function or nodego */
    customLogotype?: React.ReactNode | (() => React.ReactNode);
}

declare const Navigation: React.ComponentType<NavigationProps>;

export default Navigation;
