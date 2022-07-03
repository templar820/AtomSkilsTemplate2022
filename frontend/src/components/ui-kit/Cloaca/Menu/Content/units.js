import { css } from '@emotion/core';
import { hexToRGBA } from 'lib-root/utils/styleMixins';
import styled from '@emotion/styled';

export const StyledWrapper = styled.div`
    padding: 28px 0;
    position: relative;
`;

export const ContentWrapper = styled.div`
    width: 100%;
`;

export const StyledTextWrapper = styled.div`
    display: flex;
`;

export const StyledItemText = styled.span`
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 25px;
`;

export const overlayStyles = (colors, active, activeParent, isOpen) => css`
    background-color: ${active || (activeParent && !isOpen) ? hexToRGBA(colors.GrayScale_100, 0.5) : 'transparent'};
`;

export const topLineStyle = (colors, active, activeParent, withCheckbox, isOpen) => css`
    & > span:first-of-type {
        ${!isOpen && 'visibility: hidden;'}
        ${!withCheckbox && 'order: 1'};
        margin-right: ${active ? '23px' : '25px'};
        svg {
            fill: ${activeParent ? colors.primary : colors.GrayScale_700};
        }
    }
    & > span:last-child {
        cursor: pointer;
        display: flex;
        align-items: flex-start;
    }

    &:hover {
        color: ${colors.primary};
    }

    ${active &&
        css`
            font-weight: 500;
            color: ${colors.primary};
            border-right: 2px solid ${colors.primary};
        `}
    ${activeParent &&
        css`
            font-weight: 500;
            color: ${colors.primary};
        `}
    ${activeParent &&
        !isOpen &&
        css`
            font-weight: 500;
            color: ${colors.primary};
            border-right: 2px solid ${colors.primary};
        `}
`;
