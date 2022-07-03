import { css } from '@emotion/core';
import styled from '@emotion/styled';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledTreeList = styled.ul`
    list-style: none;
    margin-bottom: 0;
    overflow: hidden;

    ${({ isSubtree, horizontalOverflow }) => css`
        display: ${isSubtree ? 'block' : 'inline-block'};
        padding: 0 0 0 ${isSubtree ? '36px' : '29px'};
        ${!isSubtree &&
            horizontalOverflow &&
            css`
                white-space: nowrap;
            `};
        font-size: ${isSubtree ? '16px' : '15px'};
    `};

    ${({ selection }) => selection && 'padding-left: 0;'}
    ${({ listStyle, ...restProps }) => applyEmotionStyle(listStyle, restProps)};
    ${({ toggleStyles }) => toggleStyles};
`;

export { StyledTreeList };
