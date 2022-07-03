import styled from '@emotion/styled';
import { isVerticalWrap } from 'lib-ui/Slider/utils';
import { css } from '@emotion/core';
import { autoAddPx } from 'lib-root/utils/styleMixins';
import { applyEmotionStyle } from 'lib-root/utils';

const StyledCircle = styled.div`
    ${({ colors, barWidth, color, markCircleStyle, orientation, position, variant, ...restProps }) => {
        const isSmall = variant === 'sm';
        const size = isSmall
            ? barWidth + 2 // (2 point border - 1 point reduce) * 2
            : barWidth + 6; // (2 point border + 1 point extend) * 2

        const isVertical = isVerticalWrap(orientation);

        const getPositionStyle = () =>
            isVertical()
                ? css`
                      bottom: ${autoAddPx(position)};
                  `
                : css`
                      left: ${autoAddPx(position)};
                  `;

        const getTransformStyle = () =>
            isVertical()
                ? css`
                      transform: translateX(-${autoAddPx((size - barWidth) / 2)}) translateY(50%);
                  `
                : css`
                      transform: translateX(-50%) translateY(-${autoAddPx((size - barWidth) / 2)});
                  `;

        return css`
            position: absolute;
            ${!isSmall && 'cursor: pointer;'}
            ${getPositionStyle()};
            height: ${autoAddPx(size)};
            width: ${autoAddPx(size)};
            background: ${colors.GrayScale_0};
            border: 2px solid ${color};
            border-radius: ${autoAddPx(size - 2)};
            ${getTransformStyle()};
            box-sizing: border-box;
            ${!isSmall && 'box-shadow: 0px 0px 4px rgba(51, 51, 51, 0.25);'};

            ${applyEmotionStyle(markCircleStyle, {
                colors,
                barWidth,
                color,
                orientation,
                position,
                variant,
                ...restProps
            })}
            user-select: none;
        `;
    }};
`;

const StyledCircleLabel = styled.div`
    ${({ barWidth, colors, color, markLabelStyle, orientation, position, ...restProps }) => {
        const isVertical = isVerticalWrap(orientation);

        const getPositionStyle = () =>
            isVertical()
                ? css`
                      bottom: ${autoAddPx(position)};
                  `
                : css`
                      left: ${autoAddPx(position)};
                  `;

        const getTransformStyle = () =>
            isVertical()
                ? css`
                      bottom: ${autoAddPx(position)};
                      transform: translateX(${autoAddPx(7 + barWidth)}) translateY(50%);
                  `
                : css`
                      transform: translateX(-50%) translateY(${autoAddPx(7 + barWidth)});
                  `;

        return css`
            ${getPositionStyle()};
            position: absolute;
            font-size: 12px;
            color: ${color || colors.GrayScale_900};
            ${getTransformStyle()};
            ${applyEmotionStyle(markLabelStyle, { barWidth, colors, color, orientation, position, ...restProps })}
        `;
    }};
`;

export { StyledCircle, StyledCircleLabel };
