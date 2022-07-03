import { autoAddPx } from 'lib-root/utils/styleMixins';
import getType from 'lib-root/utils/getType';

import { closeItem as defaultCloseItem } from './units';
import { useCallback, useRef, useState } from 'react';

export const splitAnimationDurations = (duration) => {
    const result = { closeAnimationDuration: duration, openAnimationDuration: duration };
    if (typeof duration === 'object') {
        result.closeAnimationDuration = duration.close;
        result.openAnimationDuration = duration.open;
    }
    return result;
};

export const getSize = ({
    state,
    min,
    max,
    isOpen,
    direction,
    ref: { current: { ['scroll' + direction]: size } = {} } = {}
}) => {
    let result;
    switch (state) {
        case 'entering':
            result = max === 'auto' ? size : max;
            break;
        case 'entered':
            result = isOpen === true ? max : size;
            break;
        case 'exited':
            result = isOpen === true ? size : min;
            break;
        case 'exiting':
        default:
            result = min;
    }
    return autoAddPx(result);
};

export const createOpenStateHandler = (condition, currentState, targetState, handler, eventCallback) => {
    if (condition && handler && currentState !== targetState) {
        return (event) => {
            if (eventCallback) eventCallback(event);
            handler('menu', targetState, event);
        };
    }
    return eventCallback;
};

export const customizeCloseItem = (isOpen, closeItem) => {
    let _closeItem = { isOpen, ...defaultCloseItem };
    switch (getType(closeItem)) {
        case 'undefined':
            break;
        case 'function':
            _closeItem = closeItem(_closeItem);
            break;
        case 'object':
            _closeItem = { ..._closeItem, ...closeItem };
            break;
        case 'element':
        case 'string':
            _closeItem = closeItem;
            break;
        default:
            return null;
    }
    return _closeItem;
};

export const useStoreController = (isControlled, callback, keysRef, isMulti = true) => {
    // ref is used to prevent frequent invalidation of callbacks
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    // callback used instead of useReducer cause useReducer pass only first arg to the reducer, her we got several
    const [store, setStore] = useState({});
    const dispatch = useCallback(
        (...args) => {
            if (callbackRef.current) callbackRef.current(...args);
            if (!isControlled)
                setStore((prevState) => {
                    const [key, value] = args;
                    if (prevState[key] === value) return prevState;

                    let result = prevState;
                    if (!isMulti) result = Object.assign(...keysRef.current.map((key) => ({ [key]: false })));
                    result = { ...result, [key]: value };

                    return result;
                });
        },
        [isControlled, isMulti]
    );
    return [store, dispatch];
};

const handleMenuList = (list, activeStore, openStore, id) => {
    let result = list;
    switch (getType(list)) {
        case 'object':
            result = { ...list };
            break;
        case 'array':
            result = { items: [...list] };
            break;
        default:
            return [result];
    }
    if (!Array.isArray(result.items)) return [result];
    const items = [];
    const keys = [];
    let isActive = undefined;
    let isOpen = undefined;
    result.items.forEach((item, index) => {
        const [_item, _keys = [], _isActive, _isOpen] = handleMenuItem(
            item,
            activeStore,
            openStore,
            (id ? id + '-' : '') + index
        );
        items.push(_item);
        keys.push(..._keys);
        isActive = _isActive === isActive || isActive === undefined ? _isActive : 'indeterminate';
        isOpen = _isOpen === isOpen || isOpen === undefined ? _isOpen : 'indeterminate';
    });
    return [items, keys, isActive, isOpen];
};

const handleMenuItem = (item, activeStore, openStore, id) => {
    let result = item;
    switch (getType(item)) {
        case 'element':
        case 'string':
            result = { id, key: id, title: item };
            break;
        case 'object':
            result = { key: id, ...item, id };
            break;
        default:
            return [result];
    }

    if (activeStore[result.key] !== undefined) result.isActive = activeStore[result.key];
    if (openStore[result.key] !== undefined) result.isOpen = openStore[result.key];

    let keys = [result.key];
    if (result.subMenu) {
        const [_subMenu, _keys = [], _isActive, _isOpen] = handleMenuList(result.subMenu, activeStore, openStore, id);
        keys.push(..._keys);
        result.subMenu = _subMenu;
        if (!result.isActive) result.isActive = result.isActive === _isActive ? _isActive : 'indeterminate';
        if (!result.isOpen) result.isOpen = result.isOpen === _isOpen ? _isOpen : 'indeterminate';
    }
    return [result, keys, result.isActive, result.isOpen];
};

export { handleMenuList as buildMenuTree };
