import * as React from 'react';
import { EmotionStylesType, CustomRenderType } from 'lib-ui';

export interface CollapseProps {
    /** Prop for control group of collapses */
    isOpen?: boolean;
    /** Controlled or uncontrolled */
    isControlled?: boolean;
    /** Expand collapse */
    expanded?: boolean;
    /** Add loader component */
    isLoading?: boolean;
    /** Text or component that will be put as heading of the Collapse. Always visible part */
    title?: CustomRenderType<{
        expandedState: boolean | undefined;
        setExpandedState: React.SetStateAction<boolean>;
        contentHeight: number;
        setContentHeight: React.SetStateAction<number>;
        refCollapse: React.RefObject<HTMLElement>;
        animateDelay: boolean | undefined;
        disabled: boolean;
    }>;
    /** Disable collapse
     * isDisabled will be deprecated in future versions
     */
    disabled?: boolean;
    /** Children */
    children?: React.ReactNode | (() => React.ReactNode[]);
    /** Callback fires then collapse expands, func(e, onExpandValues) */
    onExpand?: (event: React.MouseEvent, onExpandValues: any) => void;
    /** Defines whether "No data" message should be shown  */
    emptyState?: boolean;
    /** Props of emptyState component */
    emptyStateProps?: object;
    /** Styling object for all specific units (except emptyStates and loader) */
    styles?: {
        PanelInner?: EmotionStylesType;
        PanelHead?: EmotionStylesType;
        PanelContent?: EmotionStylesType;
        ContentCollapse?: EmotionStylesType;
        LoaderWrapper?: EmotionStylesType;
        EmptyStatesWrapper?: EmotionStylesType;
    };
}

declare const Collapse: React.ComponentType<CollapseProps>;

export default Collapse;
