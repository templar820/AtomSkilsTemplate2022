import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { StyledTreeList } from './units';
import { createItem, getTogglingAnimation } from './utils';
import { setClassName } from 'lib-root/utils/styleMixins';

function TreeList({
    children,
    className,
    isSubtree,
    listStyle,
    isLined,
    selection,
    expanded,
    animationDuration,
    horizontalOverflow,
    nestingLevel,
    ...restProps
}) {
    const listRef = useRef(null);
    const isInitialMount = useRef(true);
    const [toggleStyles, setToggleStyles] = useState(getTogglingAnimation(undefined, expanded));

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setToggleStyles(getTogglingAnimation(listRef.current.scrollHeight, expanded, animationDuration));
        }
    }, [expanded, animationDuration]);

    return (
        <StyledTreeList
            ref={listRef}
            {...{
                isSubtree,
                listStyle,
                expanded,
                isLined,
                selection,
                animationDuration,
                toggleStyles,
                horizontalOverflow
            }}
            className={setClassName({ props: { className }, name: 'tree-list' })}>
            {React.Children.map(
                children,
                (child, index) => {
                    return createItem(child, index, {
                        ...{
                            nestingLevel: nestingLevel + 1,
                            isLined,
                            animationDuration,
                            isSubtree,
                            listStyle,
                            selection,
                            ...restProps
                        }
                    });
                },
                null
            )}
        </StyledTreeList>
    );
}

TreeList.displayName = 'TreeList';
TreeList.propTypes = {
    /** Defines text or any node that will be placed in a body of the component */
    children: PropTypes.node,
    /** Defines whether component is subtree */
    isSubtree: PropTypes.bool,
    /** Defines whether component should be expanded */
    expanded: PropTypes.oneOf([true, false, 'indeterminate'])
};

TreeList.defaultProps = {
    isSubtree: true,
    expanded: true
};

export default TreeList;
