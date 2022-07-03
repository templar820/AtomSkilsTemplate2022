import React from 'react';
import styled from '@emotion/styled';
import { withProps } from 'hoc-with-props';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';
import { hexToRGBA } from 'lib-root/utils/styleMixins';
import Icon from 'lib-ui/InlineIcons';
import isPropValid from '@emotion/is-prop-valid';
import withColors from 'lib-ui/utils/withColors';

const ButtonWrapper = withColors(styled.div`
    padding: 10px;
    transition: background-color 0.3s;
    margin-right: 10px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        background-color: ${({ colors }) => hexToRGBA(colors.error, 0.1)};
    }
`);

const StyledLoader = withColors(styled.div`
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin-left: 14px;
    margin-right: 20px;
    position: relative;
    border: 2px solid transparent;
    border-bottom-color: ${({ colors }) => colors.GrayScale_0};
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: spinLoader 1.1s infinite ease-in;
    animation: spinLoader 1.1s infinite ease-in;
    @-webkit-keyframes spinLoader {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes spinLoader {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
`);

export const RetryButton = withColors(({ isRetrying, onClick, colors }) => {
    return isRetrying ? (
        <StyledLoader />
    ) : (
        <ButtonWrapper onClick={onClick}>
            {
                <Icon
                    {...{
                        w: '24',
                        h: '24',
                        icon: 'Update',
                        color: colors.errorAccent
                    }}
                />
            }
        </ButtonWrapper>
    );
});

export const DeleteIcon = withProps({
    w: '24',
    h: '24',
    icon: 'Sys_Cross_exit_rounded'
})(
    withColors(styled(Icon)`
        transition: color 0.3s;
        cursor: pointer;
        &:hover {
            color: ${({ colors }) => colors.errorAccent};
        }
    `)
);

export const StyledFileItemWrapper = withColors(styled.div`
    display: flex;
    z-index: 1;
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    line-height: 15px;
    padding: 16px;
    width: 100%;
    height: 56px;
    background-color: ${({ errorText, colors }) =>
        errorText ? hexToRGBA(colors.errorAccent, 0.1) : colors.GrayScale_100};
    border-radius: 8px;
    margin-bottom: ${({ isMultiple }) => (isMultiple ? 8 : 0)}px;
    cursor: default;
    transition: background-color 0.3s;
    &:hover {
        background-color: ${({ errorText, colors }) =>
            errorText ? hexToRGBA(colors.errorAccent, 0.2) : colors.GrayScale_150};
    }

    &:first-of-type {
        margin-top: ${({ isMultiple }) => (isMultiple ? 20 : 0)}px;
    }
    &:last-of-type {
        margin-bottom: 0;
    }

    ${({ fileItemStyle, ...restProps }) => applyEmotionStyle(fileItemStyle, restProps)};
`);

export const StyledFileItemDescriptionBlock = withColors(styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    max-width: 90%;
    color: ${({ errorText, colors }) => (errorText ? colors.errorAccent : 'inherit')};
`);

export const StyledFileName = styled.div`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const StyledFileErrorText = styled.div`
    font-size: 13px;
    margin-right: 15px;
`;

const ErrorLine = withColors(styled.div`
    position: absolute;
    bottom: 0;
    left: 8px;
    font-size: 13px;
    color: ${({ colors }) => colors.error};
    ${({ errorStyle, ...restProps }) => applyEmotionStyle(errorStyle, restProps)};
`);

export const ErrorWrapper = ({ children, ...restProps }) => {
    if (children) {
        return <ErrorLine {...restProps}>{children}</ErrorLine>;
    }
    return null;
};

export const UploaderWrapper = styled('div', {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'onUploadRetry'
})`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${({ noFiles }) => (noFiles ? 0 : '20px 24px')};
    min-height: ${({ noFiles }) => (noFiles ? 96 : 0)}px;
    border-radius: 4px;
    border: 1px dashed
        ${({ isLoading, isDragging, colors }) =>
            isLoading || isDragging ? colors.GrayScale_600 : colors.GrayScale_200};
    cursor: ${({ allFiles }) => (allFiles ? 'default' : 'pointer')};
    overflow: hidden;
    pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'all')};

    input[type='file'] {
        display: none;
    }

    &:hover {
        border-color: ${({ colors }) => colors.GrayScale_600};
    }

    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

export const StyledTitle = withColors(styled.h3`
    color: ${({ allFiles, colors }) => (allFiles ? colors.GrayScale_200 : colors.GrayScale_500)};
    font-size: 15px;
    line-height: 20px;
    font-weight: 400;
    text-align: center;
    padding: 0;
    margin: 0;
    user-select: none;
    ${({ titleStyle, ...restProps }) => applyEmotionStyle(titleStyle, restProps)};
`);

export const StyledSubtitle = withColors(styled.div`
    color: ${({ colors }) => colors.GrayScale_200};
    font-weight: 500;
`);

export const StyledTitleHighlight = withColors(styled.span`
    color: ${({ allFiles, colors }) => (allFiles ? colors.GrayScale_200 : colors.primary)};
    font-weight: 500;
    ${UploaderWrapper}:hover & {
        color: ${({ allFiles, colors }) => (!allFiles ? colors.primaryAccent : 'inherit')};
    }
`);

export const FilesWrapper = styled.div`
    width: 100%;
    cursor: default;
`;
