import * as React from 'react';
import { FieldProps } from 'lib-ui/Field';

export interface MaskedFieldProps extends Omit<FieldProps, 'value' | 'type'> {
    /** Defines value of component */
    value?: string;
    /** Defines mask of component */
    mask: Array<any> | (() => void);
    /** Defines placeholder of component */
    placeholderChar?: string;
    /** Defines whether mask should be shown */
    showMask?: boolean;
    /** When true, adding or deleting characters will not affect the positions of existing characters */
    keepCharPositions?: boolean;
    /** Defines type of component */
    type?: 'text' | 'tel' | 'password' | 'url' | 'search';
    /** Render function that recieves ref and props */
    inputRenderer?: () => React.ReactNode;
}

declare const MaskedField: React.ComponentType<MaskedFieldProps>;

export default MaskedField;
