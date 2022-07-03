import * as React from 'react';

export interface HighlightWrapperProps {
    /** String where should be find occurrence. Or "render props" function receives occurrence string */
    children?: React.ReactNode | ((occurrence: string) => React.ReactNode);
    /** String of text piece for searching in children */
    occurrence?: string;
    /** emotion styles implemented to occurrence text */
    highlight?: object;
    /** if component haven't children text */
    emptyLabel?: object;
}

declare const HighlightWrapper: React.ComponentType<HighlightWrapperProps>;

export default HighlightWrapper;
