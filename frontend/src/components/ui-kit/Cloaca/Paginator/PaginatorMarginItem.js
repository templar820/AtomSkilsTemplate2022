/** @jsx jsx */
import React, { useState } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { PaginatorItem } from './units';
import InlineIcons from 'lib-ui/InlineIcons';
import { px } from 'lib-root/utils/units';

const Wrapper = styled.span`
    display: flex;
    align-items: center;
    flex-direction: ${({ position }) => (position === 'right' ? 'row-reverse' : 'row')};
`;

const PaginatorMarginItem = ({
    position = 'left',
    pagesCount,
    activePage,
    handlePageChange,
    highlightingColor,
    step,
    show,
    size,
    ...restProps
}) => {
    const [hovered, setHovered] = useState(false);
    if (!show) return null;

    const doubleArrowStyle = (position) => css`
        cursor: pointer;
        transform: rotate(${position === 'right' ? '180deg' : '0'});
    `;

    let content;
    let arrowPage = position === 'right' ? activePage + step : activePage - step;
    if (position === 'right') {
        content = pagesCount;
        if (arrowPage > pagesCount) arrowPage = pagesCount;
    } else {
        content = 1;
        if (arrowPage < 1) arrowPage = 1;
    }
    return (
        <Wrapper {...{ position }}>
            <PaginatorItem active={false} {...{ ...restProps, highlightingColor, handlePageChange, size }}>
                {content}
            </PaginatorItem>
            <span onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                {hovered ? (
                    <InlineIcons
                        css={doubleArrowStyle(position)}
                        icon="Sys_toTheStart"
                        w={px(size, 1.25)}
                        h={px(size, 1.25)}
                        color={highlightingColor}
                        onClick={() => handlePageChange(arrowPage)}
                    />
                ) : (
                    <InlineIcons icon="Sys_Dots" w={px(size, 1.25)} h={px(size, 1.25)} />
                )}
            </span>
        </Wrapper>
    );
};

export default PaginatorMarginItem;
