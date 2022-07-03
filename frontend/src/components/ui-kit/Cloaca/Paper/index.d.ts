import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface PaperProps {
    /** Defines font-size */
    size?: string | number;
    /** Defines additional component css */
    css?: EmotionStylesType;
    /** Defines additional className */
    className?: string;
    /** Defines text or any node that will be placed in a body of the component */
    children?: React.ReactNode;
}

declare const Paper: React.ComponentType<PaperProps>;

export default Paper;
