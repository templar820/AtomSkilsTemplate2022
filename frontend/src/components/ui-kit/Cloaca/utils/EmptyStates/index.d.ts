import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface EmptyStatesProps {
    /** Defines icon scheme */
    iconScheme?: 'dandelion' | 'net';
    /** Defines custom styles for component */
    customStyles?: EmotionStylesType;
    /** Defines header */
    header?: string;
    /** Defines text */
    text?: string;
    /** Defines content to be rendered */
    renderContent?: React.ReactNode;
}

declare const EmptyStates: React.ComponentType<EmptyStatesProps>;

export default EmptyStates;
