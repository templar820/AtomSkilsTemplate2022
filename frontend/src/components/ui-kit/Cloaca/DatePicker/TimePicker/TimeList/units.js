import styled from '@emotion/styled';

import { autoAddPx } from 'lib-root/utils/styleMixins';

import { ITEM_HEIGHT } from '../config';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const ListWrapper = styled.ul`
    list-style: none;
    outline: none;
    margin: 0;
    padding: 0;
    flex: 1;
    max-height: ${({ maxNumberOfVisibleOptions }) =>
        maxNumberOfVisibleOptions ? autoAddPx(maxNumberOfVisibleOptions * ITEM_HEIGHT) : undefined};
    min-height: 0;
    overflow-y: auto;
    scroll-snap-type: y;

    &:after {
        content: '';
        display: block;
        width: 100%;
        min-height: calc(100% - ${autoAddPx(ITEM_HEIGHT)});
    }

    @supports (scroll-snap-type: y) {
        &:after {
            min-height: calc(100% - ${autoAddPx(ITEM_HEIGHT / 2 + 8)});
        }
    }

    &:focus .isActive {
        color: ${({ colors }) => colors.primary};
    }
    ${({ listWrapperStyles, ...restProps }) => applyEmotionStyle(listWrapperStyles, restProps)};
`;

export { ListWrapper };
