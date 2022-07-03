import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface CheckboxProps {
    /** Toggle control mode */
    isControlled?: boolean;
    /** Defines whether the checkbox is checked */
    checked?: boolean | 'indeterminate';
    /** Defines name of the checkbox */
    name?: string;
    /** Defines text or any node that will be placed in a body of the component */
    children?: React.ReactNode;
    /** Defines font-size */
    size?: string | number;
    /** Callback that fires when checkbox's state has changed, func(e) */
    onCheckChange?: (event: React.MouseEvent) => void;
    /** Defines whether checkbox is disabled */
    disabled?: boolean;
    /** Defines additional checkbox css */
    css?: EmotionStylesType;
    /** Defines additional frame css */
    squareStyle?: EmotionStylesType;
}

declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
