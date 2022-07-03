import React from 'react';
import styled from '@emotion/styled';

import { autoAddPx, setClassName } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledCommentBox = styled.div`
    position: relative;
    padding-bottom: ${({ _mB }) => autoAddPx(_mB)};
    min-height: ${({ _mB }) => autoAddPx(_mB)};
    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

const StyledValidationError = styled.span`
    display: block;
    white-space: nowrap;
    margin-top: 1.92px;
    font-size: 12.8px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3333;
    color: ${({ colors }) => colors.error};
    position: absolute;
    left: 0;
    top: 0;
    ${({ errorStyle, ...restProps }) => applyEmotionStyle(errorStyle, restProps)};
`;

const StyledComment = styled.span`
    display: block;
    margin-top: 3.84px;
    font-size: 12.8px;
    line-height: 1.3333;
    ${({ validationResult }) => validationResult === false && 'opacity: 0; visibility: hidden;'};
    color: ${({ colors }) => colors.GrayScale_700};
    ${({ commentStyle, ...restProps }) => applyEmotionStyle(commentStyle, restProps)};
`;

const Comment = ({
    _mB,
    validationResult,
    validationError,
    comment,
    colors,
    wrapperStyle,
    errorStyle,
    commentStyle
}) => (
    <StyledCommentBox {...{ _mB, wrapperStyle }} className={setClassName({ name: 'field__comment' })}>
        {validationResult === false && validationError && (
            <StyledValidationError
                {...{ colors, errorStyle }}
                className={setClassName({ name: 'field__comment-error' })}>
                {validationError}
            </StyledValidationError>
        )}
        {comment && (
            <StyledComment
                {...{ colors, validationResult, commentStyle }}
                className={setClassName({ name: 'field__comment-text' })}>
                {comment}
            </StyledComment>
        )}
    </StyledCommentBox>
);

export default Comment;
