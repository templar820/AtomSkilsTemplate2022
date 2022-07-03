import React from 'react';

import TextAndCheckbox from './TextAndCheckbox';
import Icon from './Icon';
import { StyledTopLine } from './units';

const TopLine = ({
    handleExpanding,
    topLineStyle,
    onClick,
    selection,
    parentChecked,
    title,
    onHover,
    nestingLevel,
    nativeTitle,
    ...restProps
}) => (
    <StyledTopLine
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        {...(nativeTitle ? { title: nativeTitle } : {})}
        {...{ nestingLevel, topLineStyle, selection, parentChecked, onClick, ...restProps }}>
        <Icon {...{ handleExpanding, selection, ...restProps }} />
        <TextAndCheckbox {...{ selection, title, ...restProps }} />
    </StyledTopLine>
);

export default TopLine;
