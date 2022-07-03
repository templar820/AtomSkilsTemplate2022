import React, { useContext } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { ColorsContext } from 'lib-root/colors';
import { autoAddPx } from 'lib-root/utils/styleMixins';

import Icon from 'lib-ui/InlineIcons';

const StyledWrapper = styled.span`
    ${({ progressType }) => css`
        display: flex;
        align-items: center;
        min-width: 30px;
        ${progressType !== 'line' &&
            css`
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                justify-content: center;
            `};
    `}
`;

const StyledPercentage = styled.span`
    font-size: ${({ captionFontSize }) => autoAddPx(captionFontSize)};
    color: ${({ colors }) => colors.GrayScale_700};
`;

const StyledIconWrapper = styled.span`
    ${({ showBg }) =>
        showBg &&
        css`
            display: inline-flex;
            position: relative;
            &:before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%;
                height: 80%;
                border-radius: 50%;
                background-color: currentColor;
            }
        `}
`;

const StyledIcon = styled(Icon)`
    position: relative;
    display: block;
`;

function getIconName(status) {
    return {
        success: 'Success',
        error: 'Sys_Cross_exit',
        warning: 'Attention_error'
    }[status];
}

const IconCaption = ({ colors, captionIconSize, progressType, status, w, h }) => {
    w = h = autoAddPx(captionIconSize);
    const icon = getIconName(status);
    const showBg = progressType === 'line' && (status === 'success' || status === 'error');
    const color = showBg ? colors.GrayScale_0 : 'currentColor';
    return (
        <StyledIconWrapper {...{ showBg }}>
            <StyledIcon {...{ w, h, icon, color }} />
        </StyledIconWrapper>
    );
};

const Percentage = ({ colors, captionFontSize, percent, ...restProps }) => {
    return <StyledPercentage {...{ colors, captionFontSize, ...restProps }}>{percent + '%'}</StyledPercentage>;
};

const pickCaption = (status, caption) => {
    if (caption) {
        return () => caption;
    } else {
        return status === 'normal' ? Percentage : IconCaption;
    }
};

const Caption = ({ status, caption, progressType, ...restProps }) => {
    const colors = useContext(ColorsContext);
    const PickedCaption = pickCaption(status, caption);
    return (
        <StyledWrapper {...{ progressType }}>
            <PickedCaption {...{ colors, status, progressType, ...restProps }} />
        </StyledWrapper>
    );
};

export default Caption;
