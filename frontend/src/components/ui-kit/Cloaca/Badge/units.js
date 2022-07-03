/** @jsx jsx */
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const PosX = {
    right: 'right: 0; margin-left: 6px;',
    middle: 'left: calc(100% - 18px);',
    left: 'left: 0; order: -1; margin-left: 0; margin-right: 6px;'
};

const PosY = {
    top: 'top: 0;',
    middle: 'position: relative; left: initial;',
    bottom: 'bottom: 0;'
};

const StyledOuter = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 10px;
    ${({ outerStyle, ...restProps }) => applyEmotionStyle(outerStyle, restProps)};
`;

const StyledInner = styled.div`
    position: relative;
    display: flex;
    align-items: ${({ alignItems }) => alignItems};
`;

const outlinedStyle = (colors) => css`
    color: ${colors.GrayScale_700};
    background: ${colors.GrayScale_0};
    border: 1px solid ${colors.GrayScale_700};
`;

const StyledBadgeLabel = styled.div`
    ${({
        colors,
        color,
        bgColor,
        badgePositionX,
        x,
        badgePositionY,
        y,
        icon,
        isOutlined,
        extendStyle,
        text,
        ...restProps
    }) => css`
        position: absolute;
        box-sizing: border-box;
        font-weight: 600;
        font-size: 10px;
        line-height: 1;
        text-align: center;
        border-radius: 16px;
        padding: 3px;
        color: ${color}; 
        background: ${bgColor || 'none'}; 
    
        ${PosX[x || badgePositionX]}
        ${PosY[y || badgePositionY]}
        max-height:${text ? '16px' : '6px'};
        ${icon && 'padding: 0px;  max-height: 16px;'}
        ${isOutlined && outlinedStyle(colors)}
        ${applyEmotionStyle(extendStyle, {
            colors,
            color,
            bgColor,
            badgePositionX,
            x,
            badgePositionY,
            y,
            icon,
            isOutlined,
            text,
            ...restProps
        })};
    `}
`;

export { StyledInner, StyledBadgeLabel, StyledOuter };
