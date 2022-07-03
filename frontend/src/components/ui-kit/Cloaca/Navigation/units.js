import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { withProps } from 'hoc-with-props';

import { autoAddPx } from 'lib-root/utils/styleMixins';

import { Dropdown } from 'lib-ui/Dropdown';
import Logotype from 'lib-ui/Logotype';
import InlineIcons from 'lib-ui/InlineIcons';
import Drawer from 'lib-ui/Drawer';
import { canUseDOM } from 'lib-root/utils';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledMenu = styled.nav`
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    height: 100%;
    ${({ css, ...restProps }) => applyEmotionStyle(css, restProps)};
`;

const StyledMenuItem = styled.li`
    ${({ position, active, showIcons, colors, color, _css, ...restProps }) => css`
        display: flex;
        flex-direction: column;
        justify-content: ${position === 'right' || !showIcons ? 'center' : 'flex-end'};
        align-items: center;
        min-width: 56px;
        height: 100%;
        padding: ${showIcons ? 0 : '5px'} 10px 0;
        ${position === 'left' &&
            css`
                border-bottom: 4px solid ${active ? 'currentColor' : 'transparent'};
            `};
        opacity: ${active ? 1 : '.5'};
        color: ${active ? color : colors.GrayScale_700};
        user-select: none;
        cursor: pointer;
        ${applyEmotionStyle(_css, { position, active, showIcons, colors, color, ...restProps })};
    `}
`;

const leftMenuBlockPosition = css`
    width: 100%;
    justify-content: center;
`;

const rightMobileMenuBlockPosition = css`
    width: 100%;
    justify-content: flex-end;
`;

const StyledMenuBlock = styled.ul`
    ${({ position, isMobile }) => css`
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
        height: 100%;

        ${position === 'left' ? leftMenuBlockPosition : isMobile && rightMobileMenuBlockPosition}
    `}
`;

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    height: ${({ height }) => autoAddPx(height)};
    padding: 0 ${({ horizontalPadding }) => autoAddPx(horizontalPadding)};
    background-color: ${({ colors }) => colors.GrayScale_0};
    box-shadow: inset 0px -1px 0 ${({ colors }) => colors.GrayScale_200};
    ${({ css, ...restProps }) => applyEmotionStyle(css, restProps)};
`;

const StyledLogotype = styled(Logotype)`
    flex-shrink: 0;
    padding: 0 40px;
`;

const StyledContentWrapper = styled.span`
    margin: 16px 0 12.2px;
    font-size: 15px;
`;

const ExtraLogoWrapper = styled.div`
    display: flex;
    padding-left: 12px;
    position: relative;
    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        height: 20px;
        border-left: 1px solid ${({ colors }) => colors.primary};
    }
    ${({ extraLogoWrapperStyles, ...restProps }) => applyEmotionStyle(extraLogoWrapperStyles, restProps)};
`;

const ExtraLogo = ({ extraLogo: children, ...restProps }) =>
    children ? <ExtraLogoWrapper {...{ children, ...restProps }} /> : null;

const StyledDropdown = withProps({
    triggerElement: <InlineIcons icon="Hamburger" w="21.6px" h="21.6px" />,
    size: 16,
    paperWrapperStyle: { position: 'static' },
    closeOnOutside: true,
    triggerPlacement: 'bottom-end'
})(styled(Dropdown)`
    top: 8px;
`);

const MobileDropdown = ({ isMobile, children, ...restProps }) => {
    if (!isMobile || !(children && children.length)) return null;
    return (
        <StyledMenuItem {...{ position: 'right', active: true, ...restProps }}>
            <StyledDropdown>{children}</StyledDropdown>
        </StyledMenuItem>
    );
};

const StyledMobileMenuIcon = ({ isOpenMobileMenu, onClick, ...restProps }) => {
    return (
        <StyledMenuItem {...{ position: 'right', active: true, ...restProps }}>
            <InlineIcons icon={isOpenMobileMenu ? 'Cross_exit' : 'Hamburger'} w="21.6px" h="21.6px" {...{ onClick }} />
        </StyledMenuItem>
    );
};

const StyledMobileDrawerWrap = withProps(({ isMinWidthMenu, top }) => ({
    container: document.body,
    position: 'right',
    size: isMinWidthMenu ? '100%' : '80%',
    showBackdrop: true,
    overflowStyle: {
        padding: '10px 0',
        height: `calc(100vh -  ${autoAddPx(top)})`,
        overflowY: 'scroll'
    },
    backdropStyle: {
        top: autoAddPx(top)
    }
}))(styled(Drawer)`
    position: fixed;
    top: ${({ top }) => autoAddPx(top)};
    height: ${({ top }) => `calc(100vh -  ${autoAddPx(top)})`};
    background-color: ${({ colors }) => colors.GrayScale_0};
`);

const StyledMobileDrawer = ({
    isShowMobileMenu,
    isOpen,
    isMinWidthMenu,
    onClickOutside,
    colors,
    headerRef,
    children
}) => {
    if (!isShowMobileMenu || !canUseDOM) return null;

    const top = headerRef.current.getBoundingClientRect().bottom;

    return (
        <StyledMobileDrawerWrap {...{ top, isOpen, isMinWidthMenu, onClickOutside, colors }}>
            {children}
        </StyledMobileDrawerWrap>
    );
};

export {
    ExtraLogo,
    MobileDropdown,
    StyledMenu,
    StyledMenuItem,
    StyledHeader,
    StyledMenuBlock,
    StyledContentWrapper,
    StyledLogotype,
    StyledMobileMenuIcon,
    StyledMobileDrawer
};
