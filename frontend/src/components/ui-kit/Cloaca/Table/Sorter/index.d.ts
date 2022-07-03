import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';
import { ReactNode, MouseEvent } from 'react';

export interface SorterProps {
    /** Defines sequence of sorting directions. Duplicates are not acceptable */
    sequence?: Array<'normal' | 'asc' | 'desc'>;
    /** Defines whether it is possible to use Sorter
     * isDisabled will be deprecated in future versions
     */
    disabled?: boolean;
    /** Defines whether it is possible for component to manage Table sorters internally */
    isControlled?: boolean;
    /** Node or render-props func that will replace default icon */
    children?:
        | ReactNode
        | ((props: {
              currentDirection: 'normal' | 'asc' | 'desc';
              disabled: boolean;
              onClick: (clickEvent: MouseEvent) => void | undefined;
          }) => ReactNode);
    /** Defines callback fired on changing sorting direction. Receives event, next sorter name and index of the column */
    onClick?: (event: React.MouseEvent, nextSorterName: 'normal' | 'asc' | 'desc', colIndex: number) => void;
    /** Defines emotion styles, that will be applied to the wrapping element (if there is one) */
    wrapperStyle?: EmotionStylesType;
}

declare const Sorter: React.ComponentType<SorterProps>;

export default Sorter;
