import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { autoAddPx } from 'lib-root/utils/styleMixins';

import { ITEM_HEIGHT } from '../config';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const ListItem = styled.li`
    height: ${autoAddPx(ITEM_HEIGHT)};
    min-height: ${autoAddPx(ITEM_HEIGHT)};
    background: transparent;
    will-change: background;
    transition: background 0.3s ease-in-out;
    width: 100%;
    cursor: pointer;
    color: inherit;
    scroll-snap-align: start;

    &:hover {
        background: ${({ colors }) => colors.GrayScale_100};
    }

    ${({ isActive, disabled, colors }) =>
        disabled &&
        css`
            cursor: default;
            opacity: 0.25;
            &:hover {
                background: ${colors.GrayScale_0};
            }
        `};

    ${({ isActive, colors }) =>
        isActive &&
        css`
            font-weight: 500;
            background: ${colors.GrayScale_100};
        `}
    ${({ listItemStyles, ...restProps }) => applyEmotionStyle(listItemStyles, restProps)};
`;
const ListItemLabel = styled.div`
    height: ${autoAddPx(ITEM_HEIGHT)};
    min-height: ${autoAddPx(ITEM_HEIGHT)};
    font-size: 15px;
    line-height: ${autoAddPx(ITEM_HEIGHT)};
    text-align: center;
    width: 100%;
    ${({ labelItemStyles, ...restProps }) => applyEmotionStyle(labelItemStyles, restProps)};
`;

export { ListItem, ListItemLabel };
