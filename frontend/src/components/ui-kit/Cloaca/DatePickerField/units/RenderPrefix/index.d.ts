import * as React from 'react';

export interface RenderPrefixProps {
    /** Is clearable */
    isClearable?: boolean;
    /** Callback that fires on mouse click */
    clearHandler?: () => void;
    /** Custom props to icon*/
    iconProps?: object;
}

declare const RenderPrefix: React.ComponentType<RenderPrefixProps>;

export default RenderPrefix;
