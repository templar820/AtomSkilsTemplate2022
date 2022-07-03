import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { ColorsContext } from 'lib-root/colors';
import isPropValid from '@emotion/is-prop-valid';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledWrapper = styled('span', { shouldForwardProp: isPropValid })`
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

const SorterSVG = ({ currentDirection, disabled, ...restProps }) => {
    const colors = useContext(ColorsContext);
    const topColor = currentDirection === 'asc' && !disabled ? colors.primary : colors.GrayScale_200;
    const bottomColor = currentDirection === 'desc' && !disabled ? colors.primary : colors.GrayScale_200;
    return (
        <StyledWrapper
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...{ disabled, currentDirection, as: 'svg', ...restProps }}>
            <path d="M10 6L12.5981 9.75H7.40192L10 6Z" fill={topColor} />
            <path d="M10 15L7.40192 11.25L12.5981 11.25L10 15Z" fill={bottomColor} />
        </StyledWrapper>
    );
};

export { SorterSVG, StyledWrapper };
