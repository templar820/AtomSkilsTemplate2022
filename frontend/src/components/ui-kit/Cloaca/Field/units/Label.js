import React from 'react';
import styled from '@emotion/styled';

import { fieldSizes } from '../utils';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledLabelWrapper = styled.span`
    display: ${({ isShow }) => (isShow ? 'inline-flex' : 'none')};
    width: 100%;
    font-weight: 500;
    line-height: 1;
    font-size: ${(props) => fieldSizes[props.fieldSize].fieldFontSize};
    min-height: ${(props) => fieldSizes[props.fieldSize].fieldLineHeight};
    ${({ labelWrapperStyle, ...restProps }) => applyEmotionStyle(labelWrapperStyle, restProps)};
`;

const StyledLabel = styled.label`
    display: inline-block;
    margin: 0 8px 0 0;
    max-width: calc(100% - 52.5px);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    ${({ labelStyle, ...restProps }) => applyEmotionStyle(labelStyle, restProps)};
`;

const StyledRequiredSpan = styled.span`
    color: ${({ colors }) => colors.error};
    padding-top: ${({ fieldSize }) => (fieldSize === 'sm' ? '1px' : '3px')};
`;

const Label = ({ colors, fieldSize, label, isRequired, required, labelWrapperStyle, labelStyle, id }) => (
    <StyledLabelWrapper {...{ fieldSize, isShow: label || isRequired || required, labelWrapperStyle }}>
        {label && <StyledLabel {...{ labelStyle, htmlFor: id, children: label }} />}
        {(isRequired || required) && <StyledRequiredSpan {...{ colors, fieldSize }}>*</StyledRequiredSpan>}
    </StyledLabelWrapper>
);

export default Label;
