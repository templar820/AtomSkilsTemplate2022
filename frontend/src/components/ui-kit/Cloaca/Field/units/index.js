import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { withProps } from 'hoc-with-props';
import isPropValid from '@emotion/is-prop-valid';

import Icon from 'lib-ui/InlineIcons';

import { autoAddPx, hexToRGBA } from 'lib-root/utils/styleMixins';

import { fieldSizes, borderWidth } from '../utils';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

import Label from './Label';
import Comment from './Comment';

const StyledFieldWrapper = styled('span', {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isLoading'
})`
    display: block;
    width: 100%;
    margin: 0;
    font-size: ${({ size }) => autoAddPx(size)};
    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

const StyledFieldInner = styled.span`
    ${({
        colors,
        readOnly,
        fieldSize,
        innerStyle,
        disabled,
        isLoading,
        haveArrows,
        validationResult,
        ...restProps
    }) => css`
        display: flex;
        flex-wrap: wrap;
        cursor: ${readOnly ? 'default' : 'text'};
        align-items: center;
        position: relative;
        border: ${borderWidth} solid ${colors.GrayScale_200};
        background: ${colors.GrayScale_0};
        padding-left: ${fieldSizes[fieldSize].innerPadding};
        line-height: 1;
        min-height: ${fieldSizes[fieldSize].fieldHeight};
        font-size: ${fieldSizes[fieldSize].fieldFontSize};

        &:hover,
        &.hover {
            border-color: ${hexToRGBA(colors.GrayScale_700, 0.5)};
        }
        &:focus,
        &:focus-within,
        &.focus {
            outline: none;
            border-color: ${colors.GrayScale_700};
        }
        ${applyEmotionStyle(innerStyle, {
            colors,
            readOnly,
            fieldSize,
            disabled,
            isLoading,
            haveArrows,
            validationResult,
            ...restProps
        })}};
        ${disabled &&
            css`
                opacity: 0.25;
                cursor: not-allowed;
                pointer-events: none;
            `};
        ${isLoading &&
            css`
                pointer-events: none;
            `};
        ${disabled &&
            css`
                background-color: ${colors.GrayScale_100};
                border-color: transparent;
            `};
        ${haveArrows && `padding-right: ${fieldSizes[fieldSize].arrowsWidth};`}
        ${validationResult !== null &&
            css`
                &,
                &:hover,
                &:focus,
                &:focus-within,
                &:disabled {
                    border-color: ${validationResult ? colors.primary : colors.error};
                }
            `}
    `}
`;

const StyledPrefixItem = styled(({ component, ...props }) =>
    React.cloneElement(component, { ...component.props, ...props })
)`
    display: flex;
    flex: 0 1 auto;
    z-index: 1;
    &.prefix-item {
        margin-right: 8px;
    }
`;

const StyledInputWrapper = styled.span`
    flex: 1 1 auto;
    display: flex;
    align-self: stretch;
    height: ${(props) => !props.isTextArea && fieldSizes[props.fieldSize].fieldHeight};
    ${({ inputWrapperStyle, ...restProps }) => applyEmotionStyle(inputWrapperStyle, restProps)};
`;

const StyledInputBackground = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: ${(props) => (props.haveArrows ? fieldSizes[props.fieldSize].arrowsWidth : '0')};
    left: 0;
    z-index: 0;
    background: transparent;
    ${({ inputBackgroundStyle, ...restProps }) => applyEmotionStyle(inputBackgroundStyle, restProps)};
`;

const StyledInput = styled.input`
    ${({ colors, fieldSize, inputStyle, isTextArea, areaHeight, icon, ...restProps }) => css`
        position: relative;
        z-index: 1;
        display: inline-flex;
        width: 100%;
        min-width: calc(${icon ? fieldSizes[fieldSize].inputPadding : '10px'} + 50px);
        //needed only for not collapse textarea
        min-height: ${isTextArea && fieldSizes[fieldSize].fieldHeight};
        line-height: ${isTextArea && 1.6};
        padding-bottom: ${isTextArea && '12px'};
        padding-top: ${isTextArea && '12px'};
        ${areaHeight && `height: ${autoAddPx(areaHeight)}`};
        padding-right: ${icon ? fieldSizes[fieldSize].inputPadding : '10px'};
        background: none;
        // необходимо для того, что бы драузеры не портили наши красивые инпуты своими автозаполнениями
        background-color: transparent !important;
        border: ${borderWidth} none ${colors.GrayScale_200};
        color: ${colors.GrayScale_700};
        outline: none;
        cursor: inherit;

        // кастомизация автозаполнения
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
            -webkit-text-fill-color: ${colors.GrayScale_700} !important;
            //-webkit-box-shadow: 0 0 0 30px green inset !important;
            transition: background-color 500000s ease-in-out 0s;
            & + div {
                background: ${colors.GrayScale_100};
            }
        }

        // удаление стрелочек для цифровых полей
        &[type='number'] {
            -moz-appearance: textfield;

            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }

        &::placeholder {
            color: inherit;
            opacity: 0.5;
        }
        ${applyEmotionStyle(inputStyle, { colors, fieldSize, isTextArea, areaHeight, icon, ...restProps })};
    `}
`;

const StyledIconWrapper = styled.div`
    ${({ type, arrowPressProps, fieldSize }) => {
        const { iconSize, iconMargin, arrowsWidth } = fieldSizes[fieldSize];
        return css`
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: ${iconSize};
            position: absolute;
            top: 50%;
            z-index: 10;
            transform: translateY(-50%);
            right: ${type === 'number' && arrowPressProps ? `calc(${iconMargin} + ${arrowsWidth})` : iconMargin};
            cursor: inherit;
        `;
    }}
`;

const StyledIcon = withProps(({ iconSize }) => ({ w: iconSize, h: iconSize }))(styled(Icon)`
    cursor: inherit;
`);

const StyledArrowsWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    border-color: inherit;
    cursor: pointer;
    display: inline-flex;
    flex-direction: column;
`;

const StyledArrowsVerticalSplitter = styled.div`
    border-color: inherit;
    border-left: ${borderWidth} solid;
    border-left-color: inherit;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
`;

const StyledArrowDown = withProps(({ arrowsWidth }) => ({ w: arrowsWidth, h: arrowsWidth, icon: 'Triangle' }))(styled(
    Icon
)`
    flex-grow: 1;
    flex-basis: 50%;
    position: relative;
    z-index: 1;
    ${({ disabled }) =>
        disabled &&
        css`
            cursor: not-allowed;
            opacity: 0.5;
        `}
`);

const StyledArrowUp = styled(StyledArrowDown)`
    transform: rotate(180deg);
`;

const StyledDivider = styled.div`
    border-color: inherit;
    border-top: ${borderWidth} solid;
    border-top-color: inherit;
    margin-left: ${borderWidth};
    z-index: 0;
    position: relative;
`;

const StyledChildGrabber = styled.div`
    position: relative;
    z-index: 2;
    ${({ childGrabberStyle, ...restProps }) => applyEmotionStyle(childGrabberStyle, restProps)};
`;

export {
    Comment,
    StyledFieldWrapper,
    StyledFieldInner,
    // секция стилизации инпута
    StyledInputBackground,
    StyledInput,
    StyledInputWrapper,
    StyledPrefixItem,
    StyledChildGrabber,
    // секция элементов для иконки справа
    StyledIconWrapper,
    StyledIcon,
    // Элемент для верхней надписи
    Label,
    // секция элементов для стрелочек
    StyledArrowsWrapper,
    StyledArrowsVerticalSplitter,
    StyledArrowUp,
    StyledArrowDown,
    StyledDivider
};
