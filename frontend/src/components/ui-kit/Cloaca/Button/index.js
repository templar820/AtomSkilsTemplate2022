/**
 *  TODO: Стоит отрефакторить на одну иконку (что бы ее на флексах изменять относительно текста)
 * **/
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Icon from 'lib-ui/InlineIcons';
import Spinner from 'lib-ui/Spinner';

import { ColorsContext } from 'lib-root/colors';

import config from './config';

import { btnSizes, spinnerModes } from './utils';
import { StyledButton, StyledLeftIcon, StyledRightIcon, StyledContentWrapper, StyledButtonInner, Fade } from './units';
import { setClassName } from 'lib-root/utils/styleMixins';
import { resolveProps } from 'lib-root/utils';

/**
 * Кнопка используется как триггер для выполнения определённого действия. Кнопка однозначно сообщает пользователю, что произойдёт после нажатия на неё.
 */
class Button extends Component {
    getLeftIcon() {
        const { leftIcon, fontSize, size } = this.props;
        return typeof leftIcon === 'string' ? (
            <StyledLeftIcon
                icon={leftIcon}
                w={btnSizes(fontSize)[size].iconSize}
                h={btnSizes(fontSize)[size].iconSize}
            />
        ) : (
            leftIcon
        );
    }

    getRightIcon() {
        const { rightIcon, fontSize, size } = this.props;
        const isIconPropIsBool = typeof rightIcon === 'boolean';
        const isIconPropIsStr = typeof rightIcon === 'string';
        return rightIcon && (isIconPropIsBool || isIconPropIsStr) ? (
            <StyledRightIcon
                icon={isIconPropIsBool ? 'Arrow_type_1' : rightIcon}
                isRotate={isIconPropIsBool}
                w={btnSizes(fontSize)[size].iconSize}
                h={btnSizes(fontSize)[size].iconSize}
            />
        ) : (
            rightIcon
        );
    }

    renderContent() {
        const { icon, size, rightIcon, children, iconStyle, fontSize } = this.props;
        if (icon && typeof icon !== 'string') {
            return icon;
        } else if (icon) {
            return (
                <Icon
                    w={btnSizes(fontSize)[size].iconSize}
                    h={btnSizes(fontSize)[size].iconSize}
                    icon={icon}
                    css={iconStyle}
                />
            );
        } else {
            return (
                <StyledContentWrapper {...{ rightIcon, fontSize }}>
                    {this.getLeftIcon()}
                    {children}
                    {this.getRightIcon()}
                </StyledContentWrapper>
            );
        }
    }

    render() {
        const { icon, isLoading, colorScheme, disabled: propDisabled, isDisabled } = this.props;
        const disabled = resolveProps(propDisabled, isDisabled);

        return (
            <ColorsContext.Consumer>
                {(colors) => (
                    <StyledButton
                        {...{ colors, ...this.props, disabled }}
                        className={setClassName({ props: this.props, name: 'button' })}>
                        <StyledButtonInner>
                            {isLoading ? (
                                <Fade>
                                    <Spinner
                                        circleCount={icon ? 1 : 3}
                                        width={60}
                                        colorScheme={spinnerModes[colorScheme]}
                                    />
                                </Fade>
                            ) : (
                                this.renderContent()
                            )}
                        </StyledButtonInner>
                    </StyledButton>
                )}
            </ColorsContext.Consumer>
        );
    }
}
Button.displayName = 'Button';
Button.propTypes = {
    /** Defines color scheme of component */
    colorScheme: PropTypes.oneOf(['primary', 'secondary', 'outline', 'white']),
    /** Defines color of component */
    color: PropTypes.string,
    /** Defines size of component */
    size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
    /** Defines text or any node that will be placed in a body of the component */
    children: PropTypes.node,
    /** Callback that fires on mouse click */
    onClick: PropTypes.func,
    /** Defines button type */
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    /** Defines whether component is disabled
     * isDisabled will be deprecated in future versions
     */
    disabled: PropTypes.bool,
    /** Turn on loading */
    isLoading: PropTypes.bool,
    /** Defines component's font-size */
    fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines coponent's additional styles */
    style: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines additional component css */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines additional icon css */
    iconStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines additional className */
    className: PropTypes.string,
    /** Defines left icon of component */
    leftIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    /** Defines right icon of component */
    rightIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.node]),
    /** Defines icon of component */
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

Button.defaultProps = {
    size: 'lg',
    colorScheme: 'primary',
    disabled: false,
    isLoading: false,
    type: 'button'
};

export default Button;
