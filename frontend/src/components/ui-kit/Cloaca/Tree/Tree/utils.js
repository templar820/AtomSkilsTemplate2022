import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isEqual } from 'lib-root/utils';
import useStateController from 'lib-root/utils/useStateController';
import { extractTextFromChildren } from 'lib-root/utils';

const updateResultTree = (tree, index, item) => {
    const newTree = [...tree];
    newTree[index] = item;
    return newTree;
};

const getStatusFromChildren = (children) =>
    children.every(({ value }, index, array) => (index ? value === array[index - 1].value : value !== 'indeterminate'))
        ? children[0].value
        : 'indeterminate';

const getNewValue = (value, defaultValue) => (value !== undefined ? value : defaultValue);

/**
 *
 * @param children Any react children
 * @param {function} callback Function receives react child, its index and parent children array.
 * Must return true if item satisfies testing conditions. Otherwise should return false or undefined.
 * @returns {array} list of elements matching the conditions
 */
const findInReactChildrenTree = (children = [], callback) =>
    React.Children.toArray(children).reduce((result, item, index, array) => {
        const current = callback(item, index, array) ? [item] : [];
        const children = item.props ? findInReactChildrenTree(item.props.children, callback) : [];
        return [...result, ...current, ...children];
    }, []);

/**
 * Apply changes to the existed vTree
 * @param {array} vTree vTree array for building updated copy
 * @param {object|array} change Must be in structure like this { id: (true || false || 'indeterminate'), ...ids }. Or vTree like structure.
 * @param {boolean} downSpread If set true, changes will cause cascading changes (with the same value) throughout the children
 * @param {boolean} upSpread If set true, changes will affect parent. If every child have the same value, parent will get the same value or indeterminate status
 * @param {boolean|string} defaultValue If value doesn't exist in VTree, it will be set to given defaultValue
 * @returns {array} copy of vTree with applied changes. Keep original subTree ref if subTree didn't change
 * @example
 * // returns [{ id: '0', value: true, children: [{ id: '0-1', children: [], value: true }] }]
 * updateVTree({vTree: [{ id: '0', children: [{ id: '0-1', children: [] }] }, ], change: {['0-1']: true} });
 */
const updateVTree = ({ vTree, change = {}, downSpread = true, upSpread = true, defaultValue = false }) =>
    vTree.reduce((resultTree, item, index) => {
        const { id, children, value } = item;
        let newValue = change[id] !== undefined ? change[id] : value;
        // if children should be changed by parent, generate new change
        const subChange =
            newValue === value || newValue === 'indeterminate' || !downSpread
                ? change
                : { ...children.reduce((result, { id }) => ({ [id]: newValue, ...result }), change) };
        const newChildren = updateVTree({
            change: subChange,
            vTree: children,
            downSpread,
            upSpread,
            defaultValue
        });
        // set value from upSpreading, item's own value or default
        newValue =
            change[id] === undefined && upSpread && children.length && newChildren !== children
                ? getStatusFromChildren(newChildren)
                : getNewValue(newValue, defaultValue);
        const newTreeItem =
            newChildren === children && newValue === value ? item : { ...item, children: newChildren, value: newValue };
        return newTreeItem === item ? resultTree : updateResultTree(resultTree, index, newTreeItem);
    }, vTree);

const flattenVTree = (vTree) =>
    vTree.reduce((result, { id, value, children }) => ({ ...result, [id]: value, ...flattenVTree(children) }), {});

const getVTreeTops = (vTree, status = true) =>
    vTree.reduce(
        (result, { id, value, children }) => ({
            ...result,
            ...(value === status ? { [id]: value } : { ...getVTreeTops(children, status) })
        }),
        {}
    );

/**
 * creates vTree from react Tree children
 * @param children Tree children consist of TreeItems withs keys set
 * @returns {array} vTree (shortening for virtualTree) structured as [ { id, children: VTree, value }, ...restLeaves]
 */
const createVTree = (children) =>
    React.Children.map(
        children,
        ({ props: { children = [], id } }) => ({
            id,
            children: createVTree(children)
        }),
        null
    );

const useParamHandlerCreator = ({ vTree, setStore, upSpread, downSpread, defaultValue, callback, isControlled }) =>
    useCallback(
        (change) => {
            const getNewVTree = () => updateVTree({ vTree, change, upSpread, downSpread, defaultValue });
            const getStore = () => flattenVTree(getNewVTree());

            if (callback) callback({ change, getNewVTree, getStore });
            if (!isControlled) setStore(getStore());
        },
        [vTree, setStore, upSpread, downSpread, defaultValue, callback, isControlled]
    );

const useParamController = ({ vTree, change, downSpread, upSpread, defaultValue, isControlled, callback }) => {
    const { value: store, handler: setStore } = useStateController({ value: change, isControlled });
    const paramVTree = useMemo(() => updateVTree({ vTree, change: store, downSpread, upSpread, defaultValue }), [
        store,
        vTree,
        downSpread,
        upSpread,
        defaultValue
    ]);

    const handler = useParamHandlerCreator({
        vTree: paramVTree,
        setStore,
        upSpread,
        downSpread,
        defaultValue,
        callback,
        isControlled
    });

    return [paramVTree, handler, setStore];
};

const useOccurrenceExpander = ({ vTree, expandTillReachOccurrence, setExpandStore, occurrenceIds, ...rest }) => {
    const handler = useParamHandlerCreator({
        vTree,
        setStore: setExpandStore,
        upSpread: true,
        downSpread: false,
        defaultValue: false,
        ...rest
    });
    useEffect(() => {
        if (expandTillReachOccurrence) {
            const change = occurrenceIds.reduce((result, id) => ({ ...result, [id]: true }), {});
            handler(change);
        }
    }, [occurrenceIds, expandTillReachOccurrence, handler]);
};

const useHidingTree = ({ vTree, occurrenceIds, hideOccurrenceFails, occurrence }) =>
    useMemo(() => {
        const isHiding = !!(hideOccurrenceFails && occurrence && occurrence.length);

        const change = isHiding
            ? occurrenceIds.reduce(
                  (result, id) => ({
                      ...result,
                      ...{ [id]: false }
                  }),
                  {}
              )
            : {};

        return updateVTree({ vTree, change, downSpread: true, upSpread: true, defaultValue: isHiding });
    }, [vTree, occurrenceIds, occurrence, hideOccurrenceFails]);

const useOccurrenceFinder = ({ children, occurrence, expandTillReachOccurrence, hideOccurrenceFails }) => {
    const [state, setState] = useState([]);
    useEffect(() => {
        if (expandTillReachOccurrence || hideOccurrenceFails) {
            const callback = ({ props: { title: _title } = {} } = {}) => {
                if (!occurrence || typeof occurrence !== 'string') return false;
                const title = extractTextFromChildren(typeof _title === 'function' ? _title({ occurrence }) : _title);
                return title.toLowerCase().includes(occurrence.toLowerCase());
            };

            setState((prevState) => {
                const state = findInReactChildrenTree(children, callback).map(({ props: { id } }) => id);
                return isEqual(prevState, state) ? prevState : state;
            });
        } else if (state.length) setState([]);
    }, [children, occurrence, expandTillReachOccurrence, hideOccurrenceFails]);
    return state;
};

/**
 * determine tree item position and set keys (of not set) and ids to all tree children
 * @param children Tree children consist of TreeItems
 * @param {string} prefix Starting symbols for items in items list. Could be undefined for top level list
 * @returns {array} copy of children with set ids and keys
 */
const getTreeWithKeys = (children = [], prefix) =>
    React.Children.toArray(children).length
        ? React.Children.map(
              children,
              (child, index) => {
                  const {
                      key,
                      props: { children, ...restProps }
                  } = child;
                  const id = prefix ? `${prefix}-${index}` : index.toString();

                  return React.cloneElement(
                      child,
                      { key: key || id, id: key || id, ...restProps },
                      getTreeWithKeys(children, id)
                  );
              },
              null
          )
        : [];

export {
    getTreeWithKeys,
    findInReactChildrenTree,
    createVTree,
    updateVTree,
    flattenVTree,
    getVTreeTops,
    useParamController,
    useOccurrenceFinder,
    useOccurrenceExpander,
    useHidingTree
};
