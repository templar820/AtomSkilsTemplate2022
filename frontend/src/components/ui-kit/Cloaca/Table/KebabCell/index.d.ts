import * as React from 'react';
import { TooltipProps } from 'lib-ui/Tooltip';

export interface KebabCellProps {
    /** render function for context menu component; */
    contextMenuComponent?: React.ComponentType;
    /** Defines props of tooltip */
    kebabTooltipProps?: TooltipProps;
}

declare const KebabCell: React.ComponentType<KebabCellProps>;

export default KebabCell;
