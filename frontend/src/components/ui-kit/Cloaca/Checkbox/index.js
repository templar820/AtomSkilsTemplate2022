import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ColorsContext } from 'lib-root/colors';
import { CheckboxSvg, CheckboxSquare, CheckboxCaption, StyledLabel } from './units';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * Используется для управления параметром выбора с тремя состояниями **checked** – `true`, `false` и `indeterminate`.
 */
class Checkbox extends Component {
    inputRef = React.createRef();
    state = { isHovered: false, isChecked: this.props.checked };

    changeCheck(e) {
        const { onCheckChange, isControlled } = this.props;
        if (onCheckChange) onCheckChange(e);

        if (!isControlled) {
            this.setState((state) => {
                return {
                    isChecked: !state.isChecked
                };
            });
        }
    }

    setIndeterminateStatus() {
        this.inputRef.current.indeterminate = this.props.checked === 'indeterminate';
    }

    componentDidMount() {
        this.setIndeterminateStatus();
    }

    componentDidUpdate(prevProps) {
        if (this.props.checked !== prevProps.checked) this.setIndeterminateStatus();
    }

    render() {
        const {
            disabled,
            name,
            checked,
            isControlled,
            children,
            children: isChildrenExist,
            css: _css,
            squareStyle,
            captionStyle,
            size,
            className,
            onCheckChange,
            ...restProps
        } = this.props;
        const { isHovered, isChecked } = this.state;

        const _checked = isControlled ? checked : isChecked;

        return (
            <ColorsContext.Consumer>
                {(colors) => (
                    <StyledLabel
                        onMouseEnter={() => this.setState({ isHovered: true })}
                        onMouseLeave={() => this.setState({ isHovered: false })}
                        {...{ disabled, _css, size, isChildrenExist }}
                        className={setClassName({ props: this.props, name: 'checkbox' })}>
                        <input
                            ref={this.inputRef}
                            type="checkbox"
                            hidden={true}
                            onChange={(e) => this.changeCheck(e)}
                            checked={_checked === true}
                            {...{ disabled, name, ...restProps }}
                        />
                        <CheckboxSquare
                            {...{ colors, disabled, isHovered, _checked, isChildrenExist, squareStyle, size }}>
                            <CheckboxSvg {...{ colors, _checked, disabled }} />
                        </CheckboxSquare>
                        <CheckboxCaption {...{ captionStyle }}>{children}</CheckboxCaption>
                    </StyledLabel>
                )}
            </ColorsContext.Consumer>
        );
    }
}
Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = {
    /** Toggle control mode */
    isControlled: PropTypes.bool,
    /** Defines whether the checkbox is checked */
    checked: PropTypes.oneOf([true, false, 'indeterminate']),
    /** Defines name of the checkbox */
    name: PropTypes.string,
    /** Defines text or any node that will be placed in a body of the component */
    children: PropTypes.node,
    /** Defines font-size */
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Callback that fires when checkbox's state has changed, func(e) */
    onCheckChange: PropTypes.func,
    /** Defines whether checkbox is disabled */
    disabled: PropTypes.bool,
    /** Defines additional checkbox css */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines additional frame css */
    squareStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};
Checkbox.defaultProps = {
    isControlled: true,
    checked: false,
    disabled: false,
    size: '16px'
};

export default Checkbox;
