import React from 'react';
import { css, keyframes, Global } from '@emotion/core';
import styled from '@emotion/styled';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

import { hexToRGBA } from 'lib-root/utils/styleMixins';

import { getPosition } from '../utils';
import Paper from 'lib-ui/Paper';

import Header from './Header';
import Buttons from './Buttons';

const ScrollPreventer = (props) => {
    if (!props.active) return null;
    return (
        <Global
            styles={css`
                body {
                    overflow: hidden;
                }
            `}
        />
    );
};

const Container = styled.div`
    ${({
        colors,
        isVisible,
        experimentalNode,
        zIndex,
        horizontalPosition,
        x,
        verticalPosition,
        y,
        css: _css,
        animationStyles
    }) => css`
        display: flex;
        align-items: ${getPosition(y || verticalPosition)};
        justify-content: ${getPosition(x || horizontalPosition)};
        position: ${experimentalNode ? 'absolute' : 'fixed'};
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: ${zIndex};
        padding: 28px;
        background: ${hexToRGBA(colors.GrayScale_700, 0.65)};

        ${animationStyles}
        ${_css};
    `};
`;

const Body = styled.div`
    overflow: auto;
    padding: 14px 28px 0;
    font-size: 15px;
    line-height: 1.6;
    ${({ bodyStyle, ...restProps }) => applyEmotionStyle(bodyStyle, restProps)};
`;

const StyledPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    width: 500px;
    max-width: 100%;
    max-height: calc(100vh - 56px);
    padding: 14px 0 28px;
    ${({ paperStyle, ...restProps }) => applyEmotionStyle(paperStyle, restProps)};
`;

export { Container, StyledPaper, Body, Header, Buttons, ScrollPreventer };
