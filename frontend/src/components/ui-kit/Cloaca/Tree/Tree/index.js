import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import TreeList from '../TreeList';
import { Wrapper } from './units';
import {
    getTreeWithKeys,
    createVTree,
    useParamController,
    useOccurrenceFinder,
    useOccurrenceExpander,
    useHidingTree
} from './utils';
import { EmptyStates } from 'lib-ui/utils';
import { setClassName } from 'lib-root/utils/styleMixins';
import { resolveProps } from 'lib-root/utils';

/**
 * Используется для отображения иерархического списка.
 *
 * import { Tree as TreeComponents } from 'core-lib-react/components';
 *
 * const { Tree, TreeItem, TreeList } = TreeComponents;
 */
const Tree = React.forwardRef(
    (
        {
            children: propChildren,
            className,
            onExpand,
            expandByDefault,
            expandUpSpreading,
            expandDownSpreading,
            onCheckChange,
            checkByDefault,
            checkUpSpreading,
            checkDownSpreading,
            controlledExpanding,
            isControlled,
            expandedStore,
            checkedStore,
            horizontalOverflow,
            animationDuration,
            occurrence,
            expandTillReachOccurrence,
            hideOccurrenceFails,
            emptyState,
            emptyStateProps,
            nestingLevel = 0,
            isDisabled,
            disabled: propDisabled,
            ...restProps
        },
        ref
    ) => {
        const disabled = resolveProps(propDisabled, isDisabled);
        const children = useMemo(() => getTreeWithKeys(propChildren), [propChildren]);
        const vTree = useMemo(() => createVTree(children), [children]);

        const [expandTree, handleExpanding, setExpandStore] = useParamController({
            vTree,
            change: expandedStore,
            downSpread: expandDownSpreading,
            upSpread: expandUpSpreading,
            defaultValue: expandByDefault,
            isControlled: controlledExpanding,
            callback: onExpand
        });

        const [checkTree, handleChecking] = useParamController({
            vTree,
            change: checkedStore,
            downSpread: checkDownSpreading,
            upSpread: checkUpSpreading,
            defaultValue: checkByDefault,
            isControlled: isControlled,
            callback: onCheckChange
        });

        const occurrenceIds = useOccurrenceFinder({
            children,
            occurrence,
            expandTillReachOccurrence,
            hideOccurrenceFails
        });
        useOccurrenceExpander({
            vTree,
            occurrenceIds,
            setExpandStore,
            expandTillReachOccurrence,
            isControlled: controlledExpanding,
            callback: onExpand
        });

        const hidingTree = useHidingTree({ vTree, occurrenceIds, hideOccurrenceFails, occurrence });

        return (
            <Wrapper
                {...{
                    ref,
                    horizontalOverflow,
                    animationDuration,
                    expandTree
                }}
                className={setClassName({ props: { className }, name: 'tree' })}>
                {!emptyState ? (
                    <TreeList
                        {...{
                            nestingLevel,
                            children,
                            isSubtree: false,
                            expandTree,
                            hidingTree,
                            checkTree,
                            handleExpanding,
                            handleChecking,
                            animationDuration,
                            horizontalOverflow,
                            occurrence,
                            disabled,
                            ...restProps
                        }}
                    />
                ) : (
                    <div style={{ position: 'relative', minHeight: '200px' }}>
                        <EmptyStates {...emptyStateProps} />
                    </div>
                )}
            </Wrapper>
        );
    }
);

Tree.displayName = 'Tree';
Tree.propTypes = {
    /** Tree items for child list */
    children: PropTypes.node.isRequired,
    /**  Inherited from tree component. Defines whether expanding controlled externally or by itself */
    controlledExpanding: PropTypes.bool,
    /**  Inherited from tree component. Defines whether checked controlled externally or by itself */
    isControlled: PropTypes.bool,
    /** Occurrence text. Will be highlighted in title text */
    occurrence: PropTypes.string,
    /** Tree will automatically expand lists to show all occurrences */
    expandTillReachOccurrence: PropTypes.bool,
    /** If subtree doesn't content occurrences, hide it. (WORK IN PROGRESS) */
    hideOccurrenceFails: PropTypes.bool,
    /** Emotion styles applied to text occurrence */
    highlight: PropTypes.object,
    /** Defines could items be selected */
    isCheckable: PropTypes.bool,
    /** Toggle selection mode */
    selection: PropTypes.bool,
    /** Contains items state of checked prop. If checking uncontrolled, represents default state.
     * It is also possible to pass vTree instead of checkedStore to prevent redundant calculations */
    checkedStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    /** Callback on item checking. Receives object with change prop and functions (getStore and getNewVTree)*/
    onCheckChange: PropTypes.func,
    /** Defines default value of checkbox */
    checkByDefault: PropTypes.bool,
    /** Defines whether parents must receive new checked status from children */
    checkUpSpreading: PropTypes.bool,
    /** Defines whether children must receive new checked status from parent */
    checkDownSpreading: PropTypes.bool,
    /** Contains keys of expanded items of the Tree. If expanding uncontrolled, represents default state */
    expandedStore: PropTypes.object,
    /** Callback on item expanding. Receives object with change prop and functions (getStore and getNewVTree) */
    onExpand: PropTypes.func,
    /** Defines default value of list expanding */
    expandByDefault: PropTypes.bool,
    /** Defines whether parents must receive new expand status from children */
    expandUpSpreading: PropTypes.bool,
    /** Defines whether children must receive new expand status from parent */
    expandDownSpreading: PropTypes.bool,
    /** Duration of icon rotating and list expanding. Receives ms */
    animationDuration: PropTypes.number,
    /** Icon on the left side of the items. Must be 'render props' if function. Receives all other props of an item */
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    /** Defines custom icon for loading state. Must be 'render props' if function. Receives all other props of an item */
    loadingIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    /** Prohibits any user manipulations with the component
     * isDisabled will be deprecated in future versions
     */
    disabled: PropTypes.bool,
    /** Defines how will be managed Tree content if it wider than parental container. False refers to text wrapping */
    horizontalOverflow: PropTypes.oneOf([false, 'hidden', 'scroll']),
    /** Defines whether items texts receives title attributes */
    addTitlesAttrs: PropTypes.bool,
    /** Style lists with vertical lines */
    isLined: PropTypes.bool,
    /** Styles applied to list elements */
    listStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Styles applied to list item elements */
    itemStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Styles applied to line contains title, checkbox and icon */
    topLineStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Styles applied to checkbox component */
    checkboxStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Styles applied to checkboxes squares */
    checkboxSquareStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Styles applied to checkboxes captions */
    checkboxCaptionStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines of no data for EmptyStates component */
    emptyState: PropTypes.bool,
    /** Props for EmptyStates component  */
    emptyStateProps: PropTypes.object,
    /** Height for item (Needed only for selection mode) */
    itemHeight: PropTypes.number
};

Tree.defaultProps = {
    controlledExpanding: false,
    isControlled: true,
    isCheckable: false,
    checkByDefault: false,
    checkUpSpreading: true,
    checkDownSpreading: true,
    expandByDefault: false,
    expandUpSpreading: false,
    expandDownSpreading: false,
    children: [],
    selection: false,
    disabled: false,
    isLined: false,
    horizontalOverflow: false,
    animationDuration: 300,
    addTitlesAttrs: false,
    expandedStore: {},
    checkedStore: {},
    expandTillReachOccurrence: false,
    hideOccurrenceFails: false,
    itemHeight: 36
};

export default Tree;
