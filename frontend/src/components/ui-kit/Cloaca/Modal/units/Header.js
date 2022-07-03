import React, { useContext } from 'react';
import styled from '@emotion/styled';
import getType from 'lib-root/utils/getType';

import { ColorsContext } from 'lib-root/colors';

import Icon from 'lib-root/components/InlineIcons';
import libIcons from 'lib-ui/InlineIcons/config';
import { handleClose } from 'lib-root/components/Modal/utils';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const CloseIconWrapper = styled.div`
    position: absolute;
    top: calc(50% + 1px);
    transform: translateY(-50%);
    right: 24px;
    cursor: pointer;
    transition: color 0.2s;
    color: currentColor;
    svg {
        display: block;
    }
    &:hover {
        color: ${({ colors }) => colors.primary};
    }
`;

const IconWrapper = styled.div`
    position: absolute;
    top: calc(50% + 1px);
    transform: translateY(-50%);
    left: 24px;
    svg {
        display: block;
    }
`;

const ContentWrapper = styled.div`
    min-height: 20px;
    text-indent: ${({ indent }) => (indent ? '26px' : 0)};
    font-weight: 500;
    font-size: 20px;
    line-height: 1;
    letter-spacing: 0.5px;
`;

const StyledHeader = styled.div`
    position: relative;
    padding: 14px 68px 10px 28px;
    border-bottom: 1px solid ${({ colors }) => colors.GrayScale_100};
    ${({ headerStyle, ...restProps }) => applyEmotionStyle(headerStyle, restProps)};
`;

function getIcon(icon, configIcon, configIconProps, iconProps, colors, headerProps) {
    const { color, icon: _configIcon, ...restConfigIconProps } = configIconProps;
    const renderHeaderIcon = (icon) => (
        <Icon
            {...{
                w: '20px',
                h: '20px',
                color: colors[color] || color,
                ...restConfigIconProps,
                ...iconProps,
                icon: icon || _configIcon
            }}
        />
    );

    switch (getType(icon)) {
        case 'element':
            return icon;
        case 'string':
            return libIcons[icon] ? renderHeaderIcon(icon) : icon;
        case 'function':
            return icon(headerProps);
        default:
            if (configIcon !== undefined) return configIcon;
            return renderHeaderIcon(icon);
    }
}

function getCloseIcon(closeIcon, onClick) {
    if (closeIcon !== undefined) return closeIcon;
    return <Icon {...{ icon: 'Sys_Cross_exit_rounded', onClick, w: '21px', h: '21px', color: 'primary' }} />;
}

export default (headerProps) => {
    const {
        showHeader,
        children = '',
        icon,
        iconProps = {},
        config: { icon: configIcon, iconProps: configIconProps = {} },
        closeIcon,
        onClose,
        headerStyle
    } = headerProps;
    if (!showHeader) return null;

    const colors = useContext(ColorsContext);
    const _icon = getIcon(icon, configIcon, configIconProps, iconProps, colors, headerProps);
    const _closeIcon = getCloseIcon(closeIcon, (e) => handleClose(onClose, e, 'CloseIconClick'));

    return (
        <StyledHeader {...{ colors, headerStyle }}>
            <IconWrapper>{_icon}</IconWrapper>
            <ContentWrapper {...{ indent: !!_icon }}>{children}</ContentWrapper>
            <CloseIconWrapper {...{ colors }}>{_closeIcon}</CloseIconWrapper>
        </StyledHeader>
    );
};
