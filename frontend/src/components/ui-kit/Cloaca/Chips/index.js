import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ColorsContext } from 'lib-root/colors';

import { StyledChips, StyledContentWrapper, StyledCloseBtn } from './units';
import { setClassName } from 'lib-root/utils/styleMixins';
import { resolveProps } from 'lib-root/utils';

/**
 * `Chips` - это компактные элементы, представляющие входные данные, атрибут или действие.
 */
class Chips extends Component {
    changeCheck = (e) => {
        const { onCheckChange, onClick, isDisabled, disabled: propDisabled } = this.props;
        const disabled = resolveProps(propDisabled, isDisabled);

        if (disabled) return;
        if (onCheckChange) onCheckChange(e);
        if (onClick) onClick(e);
    };

    getCloseBtn() {
        const { onClose, closeBtnProps } = this.props;
        return onClose && <StyledCloseBtn onClick={onClose} icon={'Cross_exit'} {...closeBtnProps} />;
    }

    renderContent() {
        const { children } = this.props;
        return (
            <StyledContentWrapper>
                {children}
                {this.getCloseBtn()}
            </StyledContentWrapper>
        );
    }

    render() {
        const { onCheckChange, ...rest } = this.props;
        return (
            <ColorsContext.Consumer>
                {(colors) => (
                    <StyledChips
                        {...{ colors, ...rest }}
                        onClick={this.changeCheck}
                        className={setClassName({ props: this.props, name: 'chips' })}>
                        {this.renderContent()}
                    </StyledChips>
                )}
            </ColorsContext.Consumer>
        );
    }
}
Chips.displayName = 'Chips';
Chips.propTypes = {
    /** Defines color scheme of component */
    colorScheme: PropTypes.oneOf(['gray', 'white', 'primary', 'red']),
    /** Defines color of component */
    color: PropTypes.string,
    /** Defines text or any node that will be placed in a body of the component */
    children: PropTypes.node,
    /** Callback that fires when component is closed, func(e) */
    onClose: PropTypes.func,
    /** Callback that fires on mouse click, func(e) */
    onClick: PropTypes.func,
    /** Defines whether component is disabled
     * isDisabled will be deprecated in future versions
     */
    disabled: PropTypes.bool,
    /** Defines whether component is checkable */
    isCheckable: PropTypes.bool,
    /** Defines whether component is checked */
    checked: PropTypes.bool,
    /** Callback that fires when checkbox's state has changed, func(e) */
    onCheckChange: PropTypes.func,
    /** Defines whether component is round */
    round: PropTypes.bool,
    /** Defines the size of border-radius */
    radius: PropTypes.string,
    /** Defines component's font-size */
    fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines coponent's additional style */
    style: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines props of close button */
    closeBtnProps: PropTypes.object,
    /** Defines additional component css */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines additional className */
    className: PropTypes.string
};

Chips.defaultProps = {
    colorScheme: 'primary',
    disabled: false,
    round: false,
    isCheckable: false,
    checked: false,
    radius: '25px',
    fontSize: '14px'
};

export default Chips;
