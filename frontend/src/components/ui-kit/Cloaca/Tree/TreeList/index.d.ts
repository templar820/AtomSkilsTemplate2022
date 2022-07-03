import * as React from 'react';

export interface TreeListProps {
    /** Defines text or any node that will be placed in a body of the component */
    children?: React.ReactNode;
    /** Defines whether component is subtree */
    isSubtree?: boolean;
    /** Defines whether component should be expanded */
    expanded?: boolean | 'indeterminate';
}

declare const TreeList: React.ComponentType<TreeListProps>;

export default TreeList;
