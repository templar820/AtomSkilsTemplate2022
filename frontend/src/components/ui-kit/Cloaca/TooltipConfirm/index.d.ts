import * as React from 'react';
import { TooltipProps } from 'lib-ui/Tooltip';
import { EmotionStylesType } from 'lib-ui';

export interface TooltipConfirmProps extends Omit<TooltipProps, 'icon'> {
    /** Defines component's additional css */
    css?: EmotionStylesType;
    /** Defines left button's text */
    buttonLeftText?: string;
    /** Defines right button's text */
    buttonRightText?: string;
    /** Defines whether icon should be shown */
    icon?: boolean;
    /** Defines name of an icon */
    iconName?: string;
    /** Defines width of an icon */
    iconWidth?: string;
    /** Defines height of an icon */
    iconHeight?: string;
    /** Callback fires on left button click, func(e) */
    onClickLeft?: (event: React.MouseEvent) => void;
    /** Callback fires on right button click, func(e) */
    onClickRight?: (event: React.MouseEvent) => void;
    /** Defines left button's additional css */
    leftButtonStyle?: EmotionStylesType;
    /** Defines left button's color scheme */
    leftButtonColorScheme?: 'primary' | 'secondary' | 'outline' | 'white';
    /** Defines left button's color */
    leftButtonColor?: string;
    /** Defines whether left button is disabled */
    leftButtonDisabled?: boolean;
    /** Defines left button's font-size */
    leftButtonFontSize?: number;
    /** Defines left button's size */
    leftButtonSize?: 'lg' | 'md' | 'sm' | 'xs';
    /** Defines right button's additional css */
    rightButtonStyle?: EmotionStylesType;
    /** Defines right button's color scheme */
    rightButtonColorScheme?: 'primary' | 'secondary' | 'outline' | 'white';
    /** Defines right button's color */
    rightButtonColor?: string;
    /** Defines whether right button is disabled */
    rightButtonDisabled?: boolean;
    /** Defines right button's font-size */
    rightButtonFontSize?: number;
    /** Defines right button's size */
    rightButtonSize?: 'lg' | 'md' | 'sm' | 'xs';
    /** Defines additional className */
    className?: string;
    /** Defines component's distance */
    distance?: number;
    /** Defines component's width */
    width?: number;
}

declare const TooltipConfirm: React.ComponentType<TooltipConfirmProps>;

export default TooltipConfirm;
