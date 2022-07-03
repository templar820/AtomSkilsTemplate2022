import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Bar from 'lib-ui/Slider/units/Bar';
import { StyledCircle, StyledCircleLabel } from 'lib-ui/Slider/units/Circle';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const wrapperSize = ({ orientation }) => {
    return orientation === 'vertical'
        ? css`
              flex-direction: column;
              min-width: 60px;
          `
        : css`
              min-height: 40px;
          `;
};

const StyledFieldWrapper = styled.div`
    max-width: 60px;
    ${({ orientation }) => (orientation === 'vertical' ? 'margin-top: 12px' : 'margin-left: 8px')};
    ${({ fieldWrapperStyle, ...restProps }) => applyEmotionStyle(fieldWrapperStyle, restProps)};
`;

const StyledWrapper = styled.div`
    display: flex;
    // Nominal transition to force transition-based events to be fired
    transition: width 1ms, height 1ms;
    align-items: center;
    position: relative;
    ${wrapperSize};
    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

const TooltipStyle = css`
    font-size: 12px;
    min-width: 30px;
    padding: 4px 6px;
`;

export { Bar, StyledCircle, StyledCircleLabel, StyledFieldWrapper, StyledWrapper, TooltipStyle };
