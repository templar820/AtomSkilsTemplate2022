import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface LogotypeProps {
    /** Defines component's font-size */
    fontSize?: string | number;
    /** Defines component's padding */
    padding?: string | number;
    /** Defines component's color */
    color?: string | number;
    /** Defines component's logo */
    logo?: 'primary' | 'secondary' | 'iot';
    /** Defines additional className */
    className?: string;
    /** Defines additional component css */
    css?: EmotionStylesType;
}

declare const Logotype: React.ComponentType<LogotypeProps>;

export default Logotype;
