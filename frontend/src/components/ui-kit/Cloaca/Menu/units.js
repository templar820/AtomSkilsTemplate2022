import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const StyledMenuWrapper = styled.div`
    height: 100%;
`;

export const curtainStyle = (colors, size, withCheckbox) =>
    css`
        display: flex;
        flex-direction: column;
        height: 100%;
        min-width: 75px;
        max-width: ${withCheckbox ? size : '320px'};
        background-color: ${colors.GrayScale_50};
        color: ${colors.GrayScale_700};
        box-shadow: 0 0 5px rgba(51, 51, 51, 0.2);
    `;
