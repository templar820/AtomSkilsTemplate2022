import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const getthumbStyle = (props) => {
    const { currentSwitchSizes, colorScheme, checked, thumbStyle, animationDuration, ...restProps } = props;
    return css`
        content: '';
        width: ${currentSwitchSizes.thumbWidth};
        height: ${currentSwitchSizes.thumbWidth};
        background-color: ${colorScheme.additional};
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(${checked ? currentSwitchSizes.thumbWidth : 0});
        box-shadow: 0 0 4px ${colorScheme.thumbShadow};
        transition: transform ${animationDuration + 'ms'};
        ${applyEmotionStyle(thumbStyle, { currentSwitchSizes, colorScheme, checked, animationDuration, ...restProps })};
    `;
};

const StyledBox = styled.span`
    ${(props) => {
        const {
            currentSwitchSizes,
            checked,
            colorScheme,
            animationDuration,
            disabled,
            isLoading,
            focused,
            finalthumbStyle,
            boxStyle
        } = props;
        return css`
            display: inline-block;
            width: ${currentSwitchSizes.wrapperWidth};
            height: ${currentSwitchSizes.wrapperHeight};
            font-size: ${currentSwitchSizes.fontSize};
            position: relative;
            border-radius: 100px;
            transition-property: background-color, border-color, color;
            transition-duration: ${animationDuration + 'ms'};
            border: 1px solid ${checked ? colorScheme.border : colorScheme.inactiveBorder};
            background-color: ${checked ? colorScheme.main : colorScheme.inactive};
            color: ${checked ? colorScheme.additional : colorScheme.inactiveAccent};
            cursor: pointer;
            ${focused &&
                css`
                    box-shadow: 0 0 5px ${colorScheme.thumbShadow};
                `}
            ${disabled &&
                css`
                    opacity: ${isLoading ? '0.2' : '0.3'};
                    cursor: not-allowed;
                `}
            ${applyEmotionStyle(boxStyle, props)};
            &:before {
                ${finalthumbStyle};
            }
        `;
    }};
`;

export default function(props) {
    const finalthumbStyle = getthumbStyle(props);
    return <StyledBox {...{ finalthumbStyle, ...props }} />;
}
