import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface TreeItemStyleProps {
    /** Styles applied to ul elements. Inherits Tree prop. Could be redefined on each item */
    listStyle?: EmotionStylesType;
    /** Styles applied to list item elements. Inherits Tree prop. Could be redefined on each item  */
    itemStyle?: EmotionStylesType;
    /** Styles applied to line contains title, checkbox and icon. Inherits Tree prop. Could be redefined on each item */
    topLineStyle?: EmotionStylesType;
    /** Styles applied to checkbox component. Inherits Tree prop. Could be redefined on each item */
    checkboxStyle?: EmotionStylesType;
    /** Styles applied to checkboxes squares. Inherits Tree prop. Could be redefined on each item */
    checkboxSquareStyle?: EmotionStylesType;
    /** Styles applied to checkboxes captions. Inherits Tree prop. Could be redefined on each item */
    checkboxCaptionStyle?: EmotionStylesType;
    /** Styles applied to overlay (Use only for selection mode) */
    overlayStyles?: EmotionStylesType;
    /** Styles applied to dotIcon (Use only for selection mode) */
    dotIconStyles?: EmotionStylesType;
}

export interface TreeItemProps extends TreeItemStyleProps {
    /** Unique for this tree scope. Automatically set by tree position of an item. Manually could be set by key. Used for storing state */
    id?: string | number;
    /** Text for the top line of tree item */
    title: React.ReactNode | ((args: { occurrence: string }) => React.ReactNode);
    /** Text to be shown as a native title */
    nativeTitle?: string;
    /** Tree items for child list */
    children?: React.ReactNode;
    /** Occurrence text. Will be highlighted in title text. Inherited from Tree */
    occurrence?: string;
    /** Emotion styles applied to text occurrence. Inherited from Tree by default. Could be set manually for item */
    highlight?: object;
    /** Icon on the left side of the item. Must be 'render props' if function. Receives all other props of an item */
    icon?: (() => React.ReactNode) | React.ReactNode;
    /** Defines custom icon for loading state. Must be 'render props' if function. Receives all other props of an item */
    loadingIcon?: (() => React.ReactNode) | React.ReactNode;
    /** Style lists with vertical lines. Inherited form Tree component by default */
    isLined?: boolean;
    /** Subtree is visible if true. Received from Tree */
    expanded?: boolean | 'indeterminate';
    /** Duration of icon rotating and list expanding. Receives ms */
    animationDuration?: number;
    /** Defines could the item be selected. Default set in tree component but could be manually set to false in checkable tree */
    isCheckable?: boolean;
    /** Checkbox status for tree item if checkable. Received from Tree */
    checked?: boolean | 'indeterminate';
    /** Prohibits any user manipulations with the component
     * isDisabled will be deprecated in future versions
     */
    disabled?: boolean;
    /** Set true to show loadingIcon instead of a status icon */
    isLoading?: boolean;
    /** Defines whether items texts receives title attributes */
    addTitlesAttrs?: boolean;
    /** Hides an treeItem and its tree */
    hidden?: boolean;
}

declare const TreeItem: React.ComponentType<TreeItemProps>;

export default TreeItem;
