import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface AccordionProps {
    /** For closing siblings */
    isOpen?: boolean;
    /** Default expand collapse */
    selectedItem?: number;
    /** For children */
    children: React.ReactNode;
    /** Close all collapses from outside */
    closeAll?: boolean;
    /** Emotion styles for Accordion div wrapper */
    wrapperStyle?: EmotionStylesType;
}

declare const Accordion: React.ComponentType<AccordionProps>;

export default Accordion;
