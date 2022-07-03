import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface TreeProps {
    /** Tree items for child list */
    children: React.ReactNode;
    /**  Inherited from tree component. Defines whether expanding controlled externally or by itself */
    controlledExpanding?: boolean;
    /**  Inherited from tree component. Defines whether checked controlled externally or by itself */
    isControlled?: boolean;
    /** Occurrence text. Will be highlighted in title text */
    occurrence?: string;
    /** Tree will automatically expand lists to show all occurrences */
    expandTillReachOccurrence?: boolean;
    /** If subtree doesn't content occurrences, hide it. (WORK IN PROGRESS) */
    hideOccurrenceFails?: boolean;
    /** Emotion styles applied to text occurrence */
    highlight?: object;
    /** Defines could items be selected */
    isCheckable?: boolean;
    /** Toggle selection mode */
    selection?: boolean;
    /** Contains items state of checked prop. If checking uncontrolled, represents default state.
     * It is also possible to pass vTree instead of checkedStore to prevent redundant calculations */
    checkedStore?: object | Array<object>;
    /** Callback on item checking. Receives object with change prop and functions (getStore and getNewVTree)*/
    onCheckChange?: () => void;
    /** Defines default value of checkbox */
    checkByDefault?: boolean;
    /** Defines whether parents must receive new checked status from children */
    checkUpSpreading?: boolean;
    /** Defines whether children must receive new checked status from parent */
    checkDownSpreading?: boolean;
    /** Contains keys of expanded items of the Tree. If expanding uncontrolled, represents default state */
    expandedStore?: object;
    /** Callback on item expanding. Receives object with change prop and functions (getStore and getNewVTree) */
    onExpand?: () => void;
    /** Defines default value of list expanding */
    expandByDefault?: boolean;
    /** Defines whether parents must receive new expand status from children */
    expandUpSpreading?: boolean;
    /** Defines whether children must receive new expand status from parent */
    expandDownSpreading?: boolean;
    /** Duration of icon rotating and list expanding. Receives ms */
    animationDuration?: number;
    /** Icon on the left side of the items. Must be 'render props' if function. Receives all other props of an item */
    icon?: (() => React.ReactNode) | React.ReactNode;
    /** Defines custom icon for loading state. Must be 'render props' if function. Receives all other props of an item */
    loadingIcon?: (() => React.ReactNode) | React.ReactNode;
    /** Prohibits any user manipulations with the component
     * isDisabled will be deprecated in future versions
     */
    disabled?: boolean;
    /** Defines how will be managed Tree content if it wider than parental container. False refers to text wrapping */
    horizontalOverflow?: false | 'hidden' | 'scroll';
    /** Defines whether items texts receives title attributes */
    addTitlesAttrs?: boolean;
    /** Style lists with vertical lines */
    isLined?: boolean;
    /** Styles applied to list elements */
    listStyle?: EmotionStylesType;
    /** Styles applied to list item elements */
    itemStyle?: EmotionStylesType;
    /** Styles applied to line contains title, checkbox and icon */
    topLineStyle?: EmotionStylesType;
    /** Styles applied to checkbox component */
    checkboxStyle?: EmotionStylesType;
    /** Styles applied to checkboxes squares */
    checkboxSquareStyle?: EmotionStylesType;
    /** Styles applied to checkboxes captions */
    checkboxCaptionStyle?: EmotionStylesType;
    /** Defines of no data for EmptyStates component */
    emptyState?: boolean;
    /** Props for EmptyStates component  */
    emptyStateProps?: object;
    /** Height for item (Needed only for selection mode) */
    itemHeight?: number;
}

declare const Tree: React.ComponentType<TreeProps>;

export default Tree;
