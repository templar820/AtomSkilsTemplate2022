import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface RowProps {
    /** emotion styles for the Row */
    css?: EmotionStylesType;
    /** Defines whether the row could be selected by TableWithControls. If undefined depends of table section% tbody - true, thead and tfoot - false */
    isSelectable?: boolean;
    /** Set row height. Real height will use biggest value from this prop and cells' calculated heights.
     * Required if you use virtualization and calculated cells' heights are non-standard. Rowspan doesn't need height specifying.
     * Default heights: ordinary row - 48, high Row - 60 */
    height?: number;
}

declare const Row: React.ComponentType<RowProps>;

export default Row;
