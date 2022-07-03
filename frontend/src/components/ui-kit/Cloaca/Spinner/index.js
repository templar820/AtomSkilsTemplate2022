import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';

import { ColorsContext } from 'lib-root/colors';
import { setClassName } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const rem = (px) => (px ? `${px / 16}rem` : undefined);

const colorConfig = {
    primary: {
        primary: 'primary',
        secondary: 'GrayScale_0'
    },
    secondary: {
        primary: 'secondary',
        secondary: 'GrayScale_0'
    },
    default: {
        primary: 'primary',
        secondary: 'secondary'
    }
};

const pulsar = ({ colors, primaryColor, secondaryColor, colorScheme = 'default' }) => {
    const _primaryColor = primaryColor || colors[colorConfig[colorScheme].primary];
    const _secondaryColor = secondaryColor || colors[colorConfig[colorScheme].secondary];
    return keyframes`
      0% {
        transform: scale(1);
        background-color: ${_primaryColor};
      }
      50% {
        transform: scale(0.75);
        background-color: ${_primaryColor};
      }
      75% {
        transform: scale(1);
        background-color: ${_secondaryColor};
      }
      100% {
        transform: scale(1);
        background-color: ${_primaryColor};
      }
    `;
};

const Container = styled.div`
    ${({ width, w, height, h, size, wrapperStyle, ...restProps }) => css`
        position: relative;
        width: ${w || rem(width)};
        height: ${h || rem(height)};
        min-height: ${rem(size)};
        ${applyEmotionStyle(wrapperStyle, { width, w, height, h, size, ...restProps })};
    `}
`;

const Inner = styled.div`
    ${({ circleCount, size, innerStyle, ...restProps }) => css`
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        max-width: ${circleCount * (size + 2)}px;
        height: ${rem(size)};
        ${applyEmotionStyle(innerStyle, { circleCount, size, ...restProps })};
    `}
`;

const Circle = styled.div`
    ${(props) => {
        const {
            colors,
            size,
            scale,
            circleKey = 0,
            delay,
            primaryColor,
            colorScheme,
            duration,
            circleStyle,
            ...restProps
        } = props;
        return css`
            width: ${rem(size * scale)};
            height: ${rem(size * scale)};
            background: ${primaryColor || colors.primary};
            border-radius: 100%;
            box-sizing: border-box;
            background-color: ${primaryColor || colors[colorConfig[colorScheme].primary]};
            animation: ${pulsar(props)} ${duration} ${circleKey * delay}ms linear infinite;
            ${applyEmotionStyle(circleStyle, {
                colors,
                size,
                scale,
                circleKey,
                delay,
                primaryColor,
                colorScheme,
                duration,
                ...restProps
            })};

            ${circleStyle};
        `;
    }}
`;

/**
 * Используется для отображение состояния загрузки.
 */
const Spinner = React.forwardRef((props, ref) => {
    const { className, children, ...restProps } = props;
    const colors = useContext(ColorsContext);
    return (
        <Container {...{ ref, ...restProps }} className={setClassName({ props: { className }, name: 'spinner' })}>
            <Inner {...restProps}>
                {children
                    ? children
                    : new Array(props.circleCount)
                          .fill(1)
                          .map((item, index) => <Circle key={index} circleKey={index} {...{ colors, ...restProps }} />)}
            </Inner>
        </Container>
    );
});

export default Spinner;

Spinner.displayName = 'Spinner';
Spinner.propTypes = {
    /** Defines color scheme of component */
    colorScheme: PropTypes.oneOf(['primary', 'secondary', 'default']),
    /** Defines size of component */
    size: PropTypes.number,
    /** Defines scale of component */
    scale: PropTypes.number,
    /** Defines the amount of circles */
    circleCount: PropTypes.number,
    /** Defines duration of animation */
    duration: PropTypes.string,
    /** Defines delay of animation */
    delay: PropTypes.number,
    /** Defines component's primary color */
    primaryColor: PropTypes.string,
    /** Defines component's secondary color */
    secondaryColor: PropTypes.string,
    /** Defines component's wrapper styles */
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines inner style */
    innerStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines circle style */
    circleStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines width */
    width: PropTypes.number,
    /** Defines height */
    height: PropTypes.number
};

Spinner.defaultProps = {
    colorScheme: 'default',
    size: 18,
    scale: 1,
    circleCount: 3,
    duration: '1500ms',
    delay: 500,
    primaryColor: undefined,
    secondaryColor: undefined,
    wrapperStyle: undefined,
    innerStyle: undefined,
    circleStyle: undefined
};

export { Circle };
