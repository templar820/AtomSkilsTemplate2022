import React from 'react';
import styled from '@emotion/styled';

import { Tree, TreeItem } from 'lib-ui/Tree';
import { checkboxSquareStyle, checkboxCaptionStyle } from './units';

const StyledTreeWrapper = styled.div`
    padding: 0;
`;

const mapSubNodes = (options, showNativeTitleForOptions) =>
    options.map(({ label, value, nativeTitle, disabled, childNodes, styles }) => (
        <TreeItem
            title={label}
            key={value}
            disabled={disabled}
            nativeTitle={showNativeTitleForOptions ? nativeTitle || label : undefined}
            {...styles}>
            {childNodes && childNodes.length && mapSubNodes(childNodes, showNativeTitleForOptions)}
        </TreeItem>
    ));

export default React.forwardRef(({ props, state, methods }, ref) => (
    <StyledTreeWrapper>
        <Tree
            selection={true}
            listStyle={{ width: '100% !important' }}
            isCheckable={true}
            checkedStore={state.vTree}
            isControlled={true}
            onCheckChange={methods.addItemInTree}
            {...{ checkboxSquareStyle, checkboxCaptionStyle }}
            {...props.treeProps}>
            {mapSubNodes(props.options, props.showNativeTitleForOptions)}
        </Tree>
    </StyledTreeWrapper>
));
