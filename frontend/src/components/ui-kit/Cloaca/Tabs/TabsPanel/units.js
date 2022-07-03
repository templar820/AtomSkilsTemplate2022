import styled from '@emotion/styled';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

export const TabsPanelWrapper = styled.div`
    ${({ tabsPanelWrapperStyle, ...restProps }) => applyEmotionStyle(tabsPanelWrapperStyle, restProps)};
`;
