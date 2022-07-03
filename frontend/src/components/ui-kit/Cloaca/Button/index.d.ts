import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface ButtonProps {
    /** Defines color scheme of component */
    colorScheme?: 'primary' | 'secondary' | 'outline' | 'white';
    /** Defines color of component */
    color?: string;
    /** Defines size of component */
    size?: 'lg' | 'md' | 'sm' | 'xs';
    /** Defines text or any node that will be placed in a body of the component */
    children?: React.ReactNode;
    /** Callback that fires on mouse click */
    onClick?: () => void;
    /** Defines button type */
    type?: 'button' | 'submit' | 'reset';
    /** Defines whether component is disabled
     * isDisabled will be deprecated in future versions
     */
    disabled?: boolean;
    /** Turn on loading */
    isLoading?: boolean;
    /** Defines component's font-size */
    fontSize?: string | number;
    /** Defines coponent's additional styles */
    style?: EmotionStylesType;
    /** Defines additional component css */
    css?: EmotionStylesType;
    /** Defines additional icon css */
    iconStyle?: EmotionStylesType;
    /** Defines additional className */
    className?: string;
    /** Defines left icon of component */
    leftIcon?: string | React.ReactNode;
    /** Defines right icon of component */
    rightIcon?: string | boolean | React.ReactNode;
    /** Defines icon of component */
    icon?: React.ReactNode | string;
}

declare const Button: React.ComponentType<ButtonProps>;

export default Button;
