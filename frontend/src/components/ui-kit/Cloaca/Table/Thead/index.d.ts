import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface TheadProps {
    /** emotion styles for the Thead section */
    css?: EmotionStylesType;
}

declare const Thead: React.ComponentType<TheadProps>;

export default Thead;
