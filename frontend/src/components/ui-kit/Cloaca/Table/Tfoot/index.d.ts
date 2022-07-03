import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface TfootProps {
    /** emotion styles for the Tfoot section */
    css?: EmotionStylesType;
}

declare const Tfoot: React.ComponentType<TfootProps>;

export default Tfoot;
