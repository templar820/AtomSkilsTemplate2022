import React from 'react';
import { css, keyframes } from '@emotion/core';

import { autoAddPx } from 'lib-root/utils/styleMixins';

const slideToggle = (height, expand) => {
    if (expand) {
        return keyframes`
          0% {
            max-height: 0;
          }
          99.999% {
            max-height: ${autoAddPx(height)};
          }
          100% {
            max-height: initial;
          }
        `;
    } else {
        return keyframes`
          0% {
            max-height: ${autoAddPx(height)};
          }
          100% {
            max-height: 0;
            width: 0;
          }
        `;
    }
};

const getTogglingAnimation = (height, expanded, duration) => {
    if (height === undefined) {
        return css`
            max-height: ${expanded ? 'initial' : 0};
            width: ${expanded ? 'initial' : 0};
        `;
    } else {
        return css`
            animation: ${slideToggle(height, expanded)} ${expanded ? duration * 1.5 : duration}ms linear forwards;
        `;
    }
};

const createItem = (
    child,
    index,
    { hidingTree: parentHidingTree, expandTree: parentExpandTree, checkTree: parentCheckTree, ...restListProps }
) => {
    const { children, id, ...restChildProps } = child.props;
    const { value: checked, children: checkTree = [] } =
        parentCheckTree.find(({ id: childId }) => childId === id) || {};
    const { value: expanded, children: expandTree = [] } =
        parentExpandTree.find(({ id: childId }) => childId === id) || {};
    const { value: hidden, children: hidingTree = [] } =
        parentHidingTree.find(({ id: childId }) => childId === id) || {};

    return React.cloneElement(
        child,
        {
            ...{
                checked,
                expanded,
                hidden: hidden === 'indeterminate' ? false : hidden,
                ...restListProps,
                ...restChildProps,
                id,
                expandTree,
                checkTree,
                hidingTree
            }
        },
        children
    );
};

export { createItem, getTogglingAnimation };
