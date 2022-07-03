import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { ColorsContext } from 'lib-root/colors';

import TreeList from '../TreeList';
import TopLine from './units/TopLine';
import { StyledTreeItem, StyledOverlay } from './units/units';
import { setClassName } from 'lib-root/utils/styleMixins';
import { resolveProps } from 'lib-root/utils';

const TreeItem = React.forwardRef(
    (
        {
            children,
            className,
            isDisabled,
            disabled: propDisabled,
            checked,
            expanded,
            hidden,
            selection,
            handleChecking,
            id,
            title,
            isSubtree,
            isLined,
            itemStyle,
            parentChecked,
            checkTree,
            expandTree,
            hidingTree,
            nestingLevel,
            ...restProps
        },
        ref
    ) => {
        const disabled = resolveProps(propDisabled, isDisabled);
        const colors = useContext(ColorsContext);
        const hasSubtree = !children || !!children.length;

        const [hovered, setHover] = useState(false);

        if (hidden === true) return null;

        return (
            <StyledTreeItem
                {...{ colors, ref, isLined, isSubtree, disabled, itemStyle, checked, selection, parentChecked }}
                className={setClassName({ props: { className }, name: 'tree-list__item' })}>
                {selection && (
                    <StyledOverlay
                        onClick={() => handleChecking({ [id]: checked !== true })}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        {...{ colors, selection, parentChecked, checked, hovered, ...restProps }}
                    />
                )}
                <TopLine
                    {...{
                        nestingLevel,
                        hasSubtree,
                        id,
                        handleChecking,
                        title,
                        selection,
                        checked,
                        expanded,
                        parentChecked,
                        onHover: setHover,
                        ...restProps
                    }}
                />
                {hasSubtree && (
                    <TreeList
                        {...{
                            nestingLevel,
                            expandTree,
                            checkTree,
                            expanded,
                            selection,
                            handleChecking,
                            isLined,
                            itemStyle,
                            parentChecked: checked,
                            children,
                            hidingTree,
                            ...restProps
                        }}
                    />
                )}
            </StyledTreeItem>
        );
    }
);

TreeItem.displayName = 'TreeItem';
TreeItem.propTypes = {
    /** Unique for this tree scope. Automatically set by tree position of an item. Manually could be set by key. Used for storing state */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Text for the top line of tree item */
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    /** Tree items for child list */
    children: PropTypes.node,
    /** Occurrence text. Will be highlighted in title text. Inherited from Tree */
    occurrence: PropTypes.string,
    /** Emotion styles applied to text occurrence. Inherited from Tree by default. Could be set manually for item */
    highlight: PropTypes.object,
    /** Icon on the left side of the item. Must be 'render props' if function. Receives all other props of an item */
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    /** Defines custom icon for loading state. Must be 'render props' if function. Receives all other props of an item */
    loadingIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    /** Style lists with vertical lines. Inherited form Tree component by default */
    isLined: PropTypes.bool,
    /** Subtree is visible if true. Received from Tree */
    expanded: PropTypes.oneOf([true, false, 'indeterminate']),
    /** Duration of icon rotating and list expanding. Receives ms */
    animationDuration: PropTypes.number,
    /** Defines could the item be selected. Default set in tree component but could be manually set to false in checkable tree */
    isCheckable: PropTypes.bool,
    /** Checkbox status for tree item if checkable. Received from Tree */
    checked: PropTypes.oneOf([true, false, 'indeterminate']),
    /** Prohibits any user manipulations with the component
     * isDisabled will be deprecated in future versions
     */
    disabled: PropTypes.bool,
    /** Set true to show loadingIcon instead of a status icon */
    isLoading: PropTypes.bool,
    /** Defines whether items texts receives title attributes */
    addTitlesAttrs: PropTypes.bool,
    /** Styles applied to ul elements. Inherits Tree prop. Could be redefined on each item */
    listStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Styles applied to list item elements. Inherits Tree prop. Could be redefined on each item  */
    itemStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Styles applied to line contains title, checkbox and icon. Inherits Tree prop. Could be redefined on each item */
    topLineStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Styles applied to checkbox component. Inherits Tree prop. Could be redefined on each item */
    checkboxStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Styles applied to checkboxes squares. Inherits Tree prop. Could be redefined on each item */
    checkboxSquareStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Styles applied to checkboxes captions. Inherits Tree prop. Could be redefined on each item */
    checkboxCaptionStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Styles applied to overlay (Use only for selection mode) */
    overlayStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Styles applied to dotIcon (Use only for selection mode) */
    dotIconStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Hides an treeItem and its tree */
    hidden: PropTypes.bool
};

TreeItem.defaultProps = {
    title: '',
    addTitlesAttrs: false
};

export default TreeItem;
