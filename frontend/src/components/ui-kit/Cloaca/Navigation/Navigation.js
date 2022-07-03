import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import { withColors } from 'lib-ui/utils';
import { debounce } from 'lib-root/utils';

import { Item as DropdownItem } from 'lib-ui/Dropdown';

import config from './config';

import {
    ExtraLogo,
    MobileDropdown,
    StyledMenu,
    StyledHeader,
    StyledMenuBlock,
    StyledLogotype,
    StyledMobileMenuIcon,
    StyledMobileDrawer
} from './units';
import { Item } from './index';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * *Шапка* с логотипом, меню и блоком авторизации
 *
 * import { Navigation as NavigationComponents } from 'core-lib-react/components';
 *
 * const { Navigation, NavigationWithPreset, Item } = NavigationComponents;
 */
class Navigation extends Component {
    state = {
        isMobile: undefined,
        isShowMobileMenu: null,
        isOpenMobileMenu: false,
        isMinWidthMenu: false
    };

    headerRef = React.createRef();

    updateMobileState = () => {
        const { mobileWidthSm, mobileWidthLg } = config.presets.normal;
        const { mobileMenuWidth, mobileMinMenuWidth } = this.props;

        /* if there are less than 6 children, then the mobile version works earlier */
        const sizeByQuantity = this.props.children && this.props.children.length > 5 ? mobileWidthLg : mobileWidthSm;

        this.setState({
            isMobile: window.innerWidth <= sizeByQuantity,
            isShowMobileMenu: window.innerWidth <= mobileMenuWidth,
            isMinWidthMenu: window.innerWidth <= mobileMinMenuWidth
        });
    };

    updateMobileListener = debounce(this.updateMobileState);

    componentDidMount() {
        if (this.state.isMobile === undefined) {
            this.updateMobileState();
            window.addEventListener('resize', this.updateMobileListener);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isMobile !== this.props.isMobile) {
            if (this.props.isMobile !== undefined) {
                window.removeEventListener('resize', this.updateMobileListener);
            } else {
                window.addEventListener('resize', this.updateMobileListener);
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateMobileListener);
    }

    static getDerivedStateFromProps(props, state) {
        return props.isMobile !== undefined && props.isMobile !== state.isMobile ? { isMobile: props.isMobile } : null;
    }

    renderMenuItemsGroup = (position, color) => {
        const { children, showIcons } = this.props;
        return React.Children.map(
            children,
            ({ key, props: { position: itemPosition, children, ...restProps } = {} } = {}) => {
                if (position !== itemPosition) return null;

                return (
                    <Item key={key || children || uuid()} {...{ position, showIcons, children, color, ...restProps }} />
                );
            },
            null
        );
    };

    renderDropdownItems = () =>
        React.Children.map(
            this.props.children,
            ({ key, props: { children, icon, position, active, ...restProps } = {} } = {}) => {
                if (position !== 'left') return null;
                return (
                    <DropdownItem
                        key={key || children || uuid()}
                        {...{ active, leftIcon: icon, value: children, children, ...restProps }}
                    />
                );
            },
            null
        );

    renderLogotype = () => {
        const { customLogotype } = this.props;
        if (customLogotype) {
            return typeof customLogotype === 'function' ? customLogotype(this.state, this.props) : customLogotype;
        } else {
            const { logoColor, logoFontSize, onLogoClick, colors } = this.props;
            const _logoColor = colors[logoColor] || logoColor;
            return <StyledLogotype color={_logoColor} fontSize={logoFontSize} onClick={onLogoClick} />;
        }
    };

    handleMenuClick = () => {
        this.setState((state) => {
            return { isOpenMobileMenu: !state.isOpenMobileMenu };
        });
    };

    render() {
        const {
            className,
            menuClassName,
            height,
            horizontalPadding,
            extraLogo,
            showIcons,
            extraLogoWrapperStyles,
            colorRight,
            colorLeft,
            onLogoClick,
            colors,
            customLogotype,
            mobileDrawerRenderer,
            ...restProps
        } = this.props;
        const { isMobile, isShowMobileMenu, isOpenMobileMenu, isMinWidthMenu } = this.state;

        const _colorRight = colors[colorRight] || colorRight;
        const _colorLeft = colors[colorLeft] || colorLeft;

        return (
            <>
                <StyledHeader
                    {...{ colors, height, horizontalPadding, ref: this.headerRef, ...restProps }}
                    className={setClassName({ props: { className }, name: 'navigation' })}>
                    {this.renderLogotype()}
                    <ExtraLogo {...{ colors, extraLogoWrapperStyles, extraLogo }} />
                    <StyledMenu className={setClassName({ props: { menuClassName }, name: 'navigation__menu' })}>
                        {!isMobile && (
                            <StyledMenuBlock {...{ isMobile, position: 'left' }}>
                                {this.renderMenuItemsGroup('left', _colorLeft)}
                            </StyledMenuBlock>
                        )}
                        <StyledMenuBlock {...{ isMobile, position: 'right' }}>
                            {this.renderMenuItemsGroup('right', _colorRight)}
                            {isShowMobileMenu ? (
                                <StyledMobileMenuIcon
                                    {...{
                                        isOpenMobileMenu,
                                        showIcons,
                                        colors,
                                        color: _colorRight,
                                        onClick: () => !isOpenMobileMenu && this.handleMenuClick()
                                    }}
                                />
                            ) : (
                                <MobileDropdown {...{ isMobile, showIcons, colors, color: _colorRight }}>
                                    {this.renderDropdownItems()}
                                </MobileDropdown>
                            )}
                        </StyledMenuBlock>
                    </StyledMenu>
                </StyledHeader>
                {mobileDrawerRenderer ? (
                    mobileDrawerRenderer({ props: this.props, state: this.state })
                ) : (
                    <StyledMobileDrawer
                        {...{
                            headerRef: this.headerRef,
                            isShowMobileMenu,
                            isOpen: isOpenMobileMenu,
                            isMinWidthMenu,
                            colors,
                            onClickOutside: () => isOpenMobileMenu && this.handleMenuClick()
                        }}>
                        {this.renderDropdownItems()}
                    </StyledMobileDrawer>
                )}
            </>
        );
    }
}

Navigation.displayName = 'Navigation';
Navigation.propTypes = {
    /** There must be Navigation Items */
    children: PropTypes.node,
    /** Defines the height of the component */
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines padding from left and right edges */
    horizontalPadding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines color of the logo (not extraLogo) */
    logoColor: PropTypes.string,
    /** Defines color of the items in right item group */
    colorRight: PropTypes.string,
    /** Defines color of the items in left item group */
    colorLeft: PropTypes.string,
    /** Defines callback on click on logo */
    onLogoClick: PropTypes.func,
    /** Custom class for nav menu */
    menuClassName: PropTypes.string,
    /** Force setting mobile mode. Undefined value means autodetect mobile appearance */
    isMobile: PropTypes.bool,
    /** Defines size of the MegaFon logo (not extraLogo) */
    logoFontSize: PropTypes.number,
    /** Defines whether menu items in desktop version should be shown with icons */
    showIcons: PropTypes.bool,
    /** Defines extra logo which could be set right to the MegaFon logo */
    extraLogo: PropTypes.node,
    /** Emotion styles applied to the top level wrapper of the component */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles applied to extraLogo if exist */
    extraLogoWrapperStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Instead of the logo will put the result of the function or nodego */
    customLogotype: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    /** Width after which the drawer appears on the hamburger menu */
    mobileMenuWidth: PropTypes.number,
    /** Width after which the drawer becomes the full width of the display */
    mobileMinMenuWidth: PropTypes.number,
    /** Render func for mobile menu ({ props, state }) */
    mobileDrawerRenderer: PropTypes.func
};

Navigation.defaultProps = {
    children: <div />,
    height: '100px',
    horizontalPadding: '50px',
    logoColor: 'primary',
    colorRight: 'primary',
    colorLeft: 'secondary',
    logoFontSize: 8,
    showIcons: true,
    mobileMenuWidth: 480,
    mobileMinMenuWidth: 320
};

export default withColors(Navigation);
