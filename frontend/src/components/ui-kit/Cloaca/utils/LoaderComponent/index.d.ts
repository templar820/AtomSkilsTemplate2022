import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface LoaderComponentProps {
    /** Sorry text */
    sorryText?: string;
    /** Loading state */
    isLoading?: boolean;
    /** Set true if you need the sorry text */
    longLoading?: boolean;
    /** Styles for StyledLoaderWrap */
    wrapperStyle?: EmotionStylesType;
    /** timeout for long loading */
    longLoadingTimeout?: number;
}

declare const LoaderComponent: React.ComponentType<LoaderComponentProps>;

export default LoaderComponent;
