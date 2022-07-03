import styled from '@emotion/styled';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledWrapper = styled.ul`
    padding: 1px 17px 2px 17px;
    margin: 0;
    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

export { StyledWrapper };
