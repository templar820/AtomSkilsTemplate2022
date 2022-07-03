import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface TbodyProps {
    /** emotion styles for the Tbody section */
    css?: EmotionStylesType;
}

declare const Tbody: React.ComponentType<TbodyProps>;

export default Tbody;
