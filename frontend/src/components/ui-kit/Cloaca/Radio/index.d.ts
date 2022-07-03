import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface RadioProps {
    /** Defines whether the component is checked */
    checked?: boolean;
    /** Defines name of component */
    name?: string;
    /** Defines text or any node that will be placed in a body of the component */
    children?: React.ReactNode;
    /** Defines font-size */
    size?: string | number;
    /** Callback that fires when component's state has changed, func(e) */
    onCheckChange?: (event: React.MouseEvent) => void;
    /** Callback fires then cursor enter on component, func(e)*/
    onMouseEnter?: (event: React.MouseEvent) => void;
    /** Callback fires then cursor leave on component, func(e)*/
    onMouseLeave?: (event: React.MouseEvent) => void;
    /** Defines whether the component is disabled */
    disabled?: boolean;
    /** Defines coponent's additional style */
    style?: EmotionStylesType;
    /** Defines coponent's additional css */
    css?: EmotionStylesType;
    /** Defines additional className */
    className?: string;
}

declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
