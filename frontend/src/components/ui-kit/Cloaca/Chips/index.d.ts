import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface ChipsProps {
    /** Defines color scheme of component */
    colorScheme?: 'gray' | 'white' | 'primary' | 'red';
    /** Defines color of component */
    color?: string;
    /** Defines text or any node that will be placed in a body of the component */
    children?: React.ReactNode;
    /** Callback that fires when component is closed, func(e) */
    onClose?: (event: React.MouseEvent) => void;
    /** Callback that fires on mouse click, func(e) */
    onClick?: (event: React.MouseEvent) => void;
    /** Defines whether component is disabled
     * isDisabled will be deprecated in future versions
     */
    disabled?: boolean;
    /** Defines whether component is checkable */
    isCheckable?: boolean;
    /** Defines whether component is checked */
    checked?: boolean;
    /** Callback that fires when checkbox's state has changed, func(e) */
    onCheckChange?: (event: React.MouseEvent) => void;
    /** Defines whether component is round */
    round?: boolean;
    /** Defines the size of border-radius */
    radius?: string;
    /** Defines component's font-size */
    fontSize?: string | number;
    /** Defines coponent's additional style */
    style?: EmotionStylesType;
    /** Defines props of close button */
    closeBtnProps?: object;
    /** Defines additional component css */
    css?: EmotionStylesType;
    /** Defines additional className */
    className?: string;
}

declare const Chips: React.ComponentType<ChipsProps>;

export default Chips;
