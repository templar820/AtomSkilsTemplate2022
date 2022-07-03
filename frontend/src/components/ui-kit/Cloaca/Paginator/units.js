/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { autoAddPx, hexToRGBA } from 'lib-root/utils/styleMixins';
import InlineIcons from 'lib-ui/InlineIcons';
import { setClassName } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';
import { px } from 'lib-root/utils/units';

const StyledPaginator = styled.div`
    display: inline-flex;
    align-items: center;
    font-size: ${({ size }) => autoAddPx(size)};
    ${({ paginationStyle, ...restProps }) => applyEmotionStyle(paginationStyle, restProps)};
`;

const itemStyle = (active, highlightingColor, colors, fontSize) => css`
    display: inline-block;
    min-width: ${px(fontSize, 2.2)};
    min-height: ${px(fontSize, 2.2)};
    max-width: ${px(fontSize, 2.2)};
    max-height: ${px(fontSize, 2.2)};
    line-height: ${px(fontSize, 2.2)};
    margin: 0 1px;
    text-align: center;
    font-size: ${fontSize};
    border-radius: 50%;
    user-select: none;
    cursor: pointer;
    ${active &&
        css`
            background-color: ${highlightingColor};
            cursor: default;
            color: ${colors.GrayScale_0};
        `}
    &:hover {
        background-color: ${active ? highlightingColor : hexToRGBA(highlightingColor, 0.2)};
    }
`;
const itemTextStyle = (num, fontSize) => css`
    vertical-align: middle;
    font-size: ${num >= 1000 ? px(fontSize, 0.8) : fontSize};
`;

const PaginatorItemsWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;

function PaginatorItems({ activePage, paginatorItemsCount, startPoint, ...restProps }) {
    const pagesArray = Array.from(Array(paginatorItemsCount), (x, index) => index + startPoint);
    return (
        <PaginatorItemsWrapper>
            {pagesArray.map(function(item) {
                const _active = activePage === item;
                return (
                    <PaginatorItem
                        key={item}
                        active={_active}
                        {...restProps}
                        className={setClassName({ props: restProps, name: 'paginator__item' })}>
                        {item}
                    </PaginatorItem>
                );
            })}
        </PaginatorItemsWrapper>
    );
}

function PaginatorItem({ active, children, highlightingColor, handlePageChange, colors, size }) {
    const fontSize = size ? px(size, 0.9375) : '15px';
    return (
        <span onClick={() => handlePageChange(children)} css={itemStyle(active, highlightingColor, colors, fontSize)}>
            <span css={itemTextStyle(children, fontSize)}>{children}</span>
        </span>
    );
}

function Arrow({ position = 'left', handlePageChange, activePage, pagesCount, highlightingColor, size }) {
    const targetPage = position === 'right' ? activePage + 1 : activePage - 1;
    const isArrowDisabled =
        (position === 'right' && activePage === pagesCount) || (position === 'left' && activePage === 1);

    const noClickStyle = () => css`
        pointer-events: none;
        cursor: default;
    `;

    const arrowStyle = ({ position, highlightingColor }) => css`
        cursor: pointer;
        transition: 0.2s color;
        transform: rotate(${position === 'right' ? '-90deg' : '90deg'});
        ${isArrowDisabled && noClickStyle()}
        &:hover:not(:disabled) {
            color: ${highlightingColor};
        }
    `;

    return (
        <InlineIcons
            css={arrowStyle({ position, highlightingColor })}
            disabled={isArrowDisabled}
            icon="Arrow_type_1"
            w={px(size, 1.5)}
            h={px(size, 1.5)}
            onClick={() => handlePageChange(targetPage)}
        />
    );
}

export { PaginatorItem, PaginatorItems, Arrow, StyledPaginator };
