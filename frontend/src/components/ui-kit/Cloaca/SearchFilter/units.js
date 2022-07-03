import styled from '@emotion/styled';
import { css } from '@emotion/core';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledFilterWrap = styled.div`
    min-width: 378px;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: flex-start;
    ${({ filterWrapStyles, ...restProps }) => applyEmotionStyle(filterWrapStyles, restProps)};
`;

const StyledFilterWrapLeft = styled.div`
    flex-shrink: 0;
    min-width: 258px;
`;

const StyledFilterWrapRight = styled.div`
    margin-left: 20px;
    padding-top: 8px;
    width: 78px;
    flex-shrink: 0;
`;

const StyledButtonBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

const wrapperStyle = css`
    margin: 0;
`;

export { StyledFilterWrap, StyledFilterWrapLeft, StyledFilterWrapRight, StyledButtonBox, wrapperStyle };
