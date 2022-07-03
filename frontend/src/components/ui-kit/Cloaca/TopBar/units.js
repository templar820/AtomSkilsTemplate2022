import { css } from '@emotion/core';
import styled from '@emotion/styled';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const baseStyles = ({ colors }) => css`
    padding: 0 8px;
    background-color: ${colors.GrayScale_700};
    display: flex;
    overflow: hidden;
`;

const baseItemStyles = ({ colors }) => css`
    color: ${colors.GrayScale_0};
    padding: 0;
    margin-bottom: 0;
    text-align: center;
    text-decoration: none;
    font-size: 12px;
    line-height: 1.6;
    li > span {
        background: none;
    }
`;

const hiddenElementStyles = css`
    position: absolute;
    top: -10000px;
    left: -10000px;
    opacity: 0;
    visibility: hidden;
`;

const StyledLeftMenuItem = styled.ul`
    ${baseItemStyles};
    ${(props) => (props.isHidden ? hiddenElementStyles : ``)};
`;

const StyledShowMoreMenuItem = styled.ul`
    ${baseItemStyles};
    ${(props) => (props.isHidden ? hiddenElementStyles : ``)};
`;

const StyledRightMenuItem = styled.ul`
    ${baseItemStyles};
    margin-left: auto;
`;

const StyledTopBar = styled.div`
    ${baseStyles};
    ${({ css, ...restProps }) => applyEmotionStyle(css, restProps)};
`;

export { StyledLeftMenuItem, StyledRightMenuItem, StyledShowMoreMenuItem, StyledTopBar };
