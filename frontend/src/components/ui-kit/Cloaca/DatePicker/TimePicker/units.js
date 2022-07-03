import styled from '@emotion/styled';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';
const TimePickWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: nowrap;
    min-width: 300px;
    min-height: 0;
    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

export { TimePickWrapper };
