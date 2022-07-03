import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { autoAddPx } from 'lib-root/utils/styleMixins';

import { calcLineCaps } from '../utils';

import Caption from './Caption';
import Bar from './Bar';
import Filler from '../Filler';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledWrapper = styled.div`
    display: ${({ progressType }) => (progressType === 'line' ? 'flex' : 'inline-flex')};
    align-items: center;
    position: relative;
    min-height: ${({ minHeight }) => minHeight};
    line-height: 1;
    color: ${({ globalColor }) => globalColor};
    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

const LineFiller = styled.div`
    ${({
        capsRounds,
        capsRadius,
        percent,
        fillerWidth,
        fillerColor,
        startPosition,
        animationDuration,
        fillerStyle,
        ...restProps
    }) => css`
        position: absolute;
        top: 50%;
        left: ${0 + startPosition}%;
        transform: translateY(-50%);
        width: ${percent - startPosition}%;
        height: ${autoAddPx(fillerWidth)};
        background: ${fillerColor};
        transition: width ${animationDuration}ms;
        border-radius: ${calcLineCaps(capsRounds, capsRadius)};
        ${applyEmotionStyle(fillerStyle, {
            capsRounds,
            capsRadius,
            percent,
            fillerWidth,
            fillerColor,
            startPosition,
            animationDuration,
            ...restProps
        })};
    `};
`;

const StyledPath = styled.path`
    transition: stroke-dasharray ${({ animationDuration }) => animationDuration}ms;
    ${({ additionalStyles, ...restProps }) => applyEmotionStyle(additionalStyles, restProps)};
`;

const Path = React.forwardRef(
    (
        {
            color = 'currentColor',
            percent = 100,
            width,
            caps = 'round',
            startPosition = 0,
            animationDuration = 0,
            circumference = 0,
            pathD: d,
            offset = 0,
            additionalStyles,
            ...restProps
        },
        ref
    ) => {
        const length = ((-offset * 2 + circumference) * percent) / 100;
        const startPositionInPx = ((-offset * 2 + circumference) * startPosition) / 100;
        return (
            <StyledPath
                stroke={color}
                strokeDasharray={`${autoAddPx(length - startPositionInPx)}, ${autoAddPx(circumference)}`}
                strokeWidth={percent > 0 ? width : 0}
                strokeLinecap={caps}
                strokeDashoffset={autoAddPx(-offset - startPositionInPx)}
                fillOpacity={0}
                {...{ ref, animationDuration, d, additionalStyles, ...restProps }}
            />
        );
    }
);

const Fillers = (props) => {
    const { fillersProps, ...restProps } = props;
    return (
        <React.Fragment>
            {fillersProps.map((fillerProps, index) => (
                <Filler key={index} {...{ ...restProps, ...fillerProps }} />
            ))}
        </React.Fragment>
    );
};

export { StyledWrapper, Caption, Bar, Path, Fillers, LineFiller };
