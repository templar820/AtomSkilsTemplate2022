import { css } from '@emotion/core';
import styled from '@emotion/styled';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledPanelInner = styled.div`
    margin-bottom: 40px;
    padding-bottom: 1px;
    box-sizing: border-box;
    ${({ styles, ...restProps }) => applyEmotionStyle(styles, restProps)};
`;

const StyledPanelHead = styled.div`
    ${({ colors, expanded, disabled }) => css`
        position: relative;
        min-height: 72px;
        font-weight: 500;
        font-size: 15px;
        line-height: 1;
        color: ${colors.GrayScale_700};
        border-top: 1px solid ${colors.GrayScale_200};
        border-bottom: 1px solid ${colors.GrayScale_200};
        cursor: pointer;
        padding: 30px 24px 1px 24px;
        background-color: ${colors[expanded ? 'GrayScale_100' : 'GrayScale_0']};
        ${disabled &&
            css`
                opacity: 0.3;
                cursor: not-allowed;
            `};

        &:after {
            content: '';
            position: absolute;
            right: 20px;
            top: 30px;
            width: 9px;
            height: 9px;
            border-right: 2px solid ${colors.GrayScale_700};
            border-bottom: 2px solid ${colors.GrayScale_700};
            transform: rotate(${expanded ? '-135deg' : '45deg'});
            transition: 0.5s transform ease;
        }
    `};
    ${({ styles, ...restProps }) => applyEmotionStyle(styles, restProps)};
`;

const collapseContent = (contentHeight, expanded, animated) => {
    if (expanded === true) {
        return css`
            ${animated ? 'max-height: none;' : ' max-height: ' + contentHeight + 'px;'}
        `;
    } else {
        return css`
            ${animated ? 'max-height: ' + contentHeight + 'px;' : ' max-height: 0px;'}
        `;
    }
};

const StyledContentCollapse = styled.div`
    overflow: hidden;
    transition: 0.3s max-height ease;

    ${({ expanded, contentHeight, animated }) => collapseContent(contentHeight, expanded, animated)};
    ${({ styles, ...restProps }) => applyEmotionStyle(styles, restProps)};
`;

const StyledPanelContent = styled.div`
    overflow: hidden;
    padding: 93px 72px 10px 40px;
    ${({ styles, ...restProps }) => applyEmotionStyle(styles, restProps)};
`;

const LoaderComponentWrapper = styled.div`
    position: relative;
    height: 50px;
    ${({ styles, ...restProps }) => applyEmotionStyle(styles, restProps)};
`;

const EmptyStatesWrapper = styled.div`
    position: relative;
    min-height: 200px;
    ${({ styles, ...restProps }) => applyEmotionStyle(styles, restProps)};
`;

const StyledAccordionWrapper = styled.div`
    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

export {
    StyledPanelInner,
    StyledPanelHead,
    StyledPanelContent,
    StyledContentCollapse,
    LoaderComponentWrapper,
    EmptyStatesWrapper,
    StyledAccordionWrapper
};
