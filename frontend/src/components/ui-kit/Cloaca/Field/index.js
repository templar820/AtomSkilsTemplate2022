import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { OutsideEventContainer } from 'react-on-outside-event';

import { withColors } from 'lib-ui/utils';

import { fieldSizes } from './utils';
import { resolveProps } from 'lib-root/utils';

import {
    StyledFieldWrapper,
    StyledFieldInner,
    Comment,
    // секция стилизации инпута
    StyledInputBackground,
    StyledInput,
    StyledInputWrapper,
    StyledPrefixItem,
    StyledChildGrabber,
    // секция элементов для иконки справа
    StyledIconWrapper,
    StyledIcon,
    // секция элементов для верхней надписи
    Label,
    // секция элементов для стрелочек
    StyledArrowsWrapper,
    StyledArrowsVerticalSplitter,
    StyledArrowUp,
    StyledArrowDown,
    StyledDivider
} from './units';
import { LoaderComponent } from 'lib-ui/utils';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * Компонент для ввода данных.
 */
class Field extends Component {
    state = {
        focused: false,
        id: uuidv4(),
        validationResult: this.props.validation,
        // need to calculate height of textarea
        areaHeight: undefined
    };

    inputRef = React.createRef();
    fieldInnerRef = React.createRef();
    arrowsRef = React.createRef();

    doValidation = async (props, event) => {
        const { validation } = props;

        return new Promise(async (res, rej) => {
            try {
                if (typeof validation === 'function') {
                    const _validationResult = await validation({ ...props, event });
                    await this.setState(
                        () => ({
                            validationResult: _validationResult
                        }),
                        () => res()
                    );
                } else {
                    await this.setState(
                        () => ({
                            validationResult: validation
                        }),
                        () => res()
                    );
                }
            } catch (e) {
                rej(e);
            }
        });
    };

    onChange = async (e) => {
        e.persist();
        const { selectionStart } = e.target;
        const { type, onChange, validation } = this.props;

        if (type !== 'number') {
            if (this.inputRef && this.inputRef instanceof HTMLElement) {
                this.inputRef.selectionEnd = selectionStart;
            }
        }

        if (onChange) {
            onChange(e);
        }

        if (validation !== null) await this.doValidation(this.props, e);
    };

    onFocus = (e) => {
        this.setState(() => ({
            focused: true
        }));
        if (this.props.autoSelect) {
            this.inputRef.current.select();
        }
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    };

    autoExpandTextArea = async () => {
        // needed for collapse textarea when user delete some of text
        await this.setState({ areaHeight: undefined });

        this.setState({ areaHeight: this.inputRef.current.scrollHeight });
    };

    componentDidMount() {
        if (this.props.validation !== null) this.doValidation(this.props);
    }

    componentDidUpdate(prevProps) {
        if (this.props.validation !== prevProps.validation) {
            this.doValidation(this.props);
        }
        if (this.props.as === 'textarea' && this.props.expandArea && this.props.value !== prevProps.value) {
            this.autoExpandTextArea();
        }
    }

    onBlur = (e) => {
        this.setState(() => ({
            focused: false
        }));
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    };

    onArrowPress = (direction) => async (e) => {
        const { max, min, value } = this.props;
        const disabled = direction === 'up' ? max && value >= max : min && value <= min;

        if (!disabled) {
            const { onArrowPress } = this.props;
            try {
                await onArrowPress(e, direction);
            } catch (err) {
                console.error('Error in Field, method: onArrowPress \n', err);
            }
        }
    };

    onClickAndSetInputFocus = (event) => {
        if (
            this.arrowsRef.current &&
            (this.arrowsRef.current === event.target || this.arrowsRef.current.contains(event.target))
        ) {
            return;
        }

        this.inputRef.current.focus();
        this.props.onClick && this.props.onClick();
        // if (['text', 'textarea'].indexOf(this.props.type) >= 0) this.inputRef.current.setSelectionRange(0, 0);
        event.nativeEvent.stopImmediatePropagation();
    };

    renderIcon = () => {
        const { icon, onArrowPress: onArrowPressProps, type, fieldSize } = this.props;
        const { iconSize } = fieldSizes[fieldSize] || {};
        return (
            <StyledIconWrapper {...{ type, fieldSize, arrowPressProps: onArrowPressProps }}>
                {typeof icon === 'string' ? (
                    <StyledIcon {...{ icon, iconSize }} />
                ) : typeof icon === 'function' ? (
                    icon(this.state, { ...this.props, iconSize })
                ) : (
                    React.cloneElement(icon, { w: iconSize, h: iconSize })
                )}
            </StyledIconWrapper>
        );
    };

    renderArrows = () => {
        const { max, min, value, fieldSize } = this.props;
        const { arrowsWidth } = fieldSizes[fieldSize] || {};

        return (
            <StyledArrowsWrapper ref={this.arrowsRef}>
                <StyledArrowUp
                    onClick={this.onArrowPress('up')}
                    disabled={max !== undefined && value >= max}
                    {...{ arrowsWidth }}
                />
                <StyledDivider />
                <StyledArrowDown
                    onClick={this.onArrowPress('down')}
                    disabled={min !== undefined && value <= min}
                    {...{ arrowsWidth }}
                />
                <StyledArrowsVerticalSplitter />
            </StyledArrowsWrapper>
        );
    };

    renderPrefix = () => {
        const { prefix } = this.props;
        const prefixElements = typeof prefix === 'function' ? prefix(this.state, this.props) : prefix;
        const childrenCount = React.Children.count(prefixElements);
        return React.Children.map(
            prefixElements,
            (prefixItem, index) => {
                const { prefixStyles = true, className = '' } = prefixItem.props;
                return React.createElement(StyledPrefixItem, {
                    component: prefixItem,
                    className: index === childrenCount - 1 && prefixStyles ? className + 'prefix-item' : undefined
                });
            },
            this
        );
    };

    render() {
        const {
            className,
            colors,
            wrapperStyle: _deprecatedWrapperStyle,
            innerStyle: _deprecatedInnerStyle,
            inputStyle: _deprecatedInputStyle,
            labelStyle: _deprecatedLabelStyle,
            labelWrapperStyle: _deprecatedLabelWrapperStyle,
            inputWrapperStyle: _deprecatedInputWrapperStyle,
            inputBackgroundStyle: _deprecatedInputBackgroundStyle,
            comment,
            label,
            validationError,
            type,
            as,
            children,
            isLoading,
            disabled,
            icon,
            isRequired,
            required,
            readOnly,
            prefix,
            fieldSize,
            marginBottom,
            mB,
            onArrowPress: onArrowPressProps,
            onMouseEnter,
            onMouseLeave,
            onClickOutside,
            onKeyDown,
            onKeyUp,
            onCreateNew,
            onSearchChange,
            onDropdownOpen,
            onDropdownClose,
            onClearAll,
            onSelectAll,
            styles,
            ...rest
        } = this.props;
        const {
            Input: _inputStyle,
            Wrapper: _wrapperStyle,
            InputInner: _inputInnerStyle,
            LabelContent: _labelContentStyle,
            LabelWrapper: _labelWrapperStyle,
            InputWrapper: _inputWrapperStyle,
            InputBackground: _inputBackgroundStyle,
            ChildGrabber: childGrabberStyle,
            Loader: loaderStyle,
            CommentWrapper: commentWrapperStyle,
            CommentValidationError: commentValidationErrorStyle,
            CommentText: commentTextStyle
        } = styles;

        const wrapperStyle = resolveProps(_deprecatedWrapperStyle, _wrapperStyle);
        const innerStyle = resolveProps(_deprecatedInnerStyle, _inputInnerStyle);
        const labelStyle = resolveProps(_deprecatedLabelStyle, _labelContentStyle);
        const labelWrapperStyle = resolveProps(_deprecatedLabelWrapperStyle, _labelWrapperStyle);
        const inputWrapperStyle = resolveProps(_deprecatedInputWrapperStyle, _inputWrapperStyle);
        const inputBackgroundStyle = resolveProps(_deprecatedInputBackgroundStyle, _inputBackgroundStyle);
        const inputStyle = resolveProps(_deprecatedInputStyle, _inputStyle);

        const {
            onChange,
            onFocus,
            onBlur,
            onClickAndSetInputFocus,
            renderIcon,
            renderArrows,
            renderPrefix,
            inputRef,
            fieldInnerRef
        } = this;
        const { validationResult = null, focused, id, areaHeight } = this.state;
        const haveArrows = type === 'number' && onArrowPressProps;
        const _mB = mB !== undefined ? mB : marginBottom;

        const isTextArea = as === 'textarea';

        return (
            <StyledFieldWrapper
                {...{ wrapperStyle, _mB, isLoading }}
                className={setClassName({ props: this.props, name: 'field' })}>
                <Label
                    {...{
                        colors,
                        fieldSize,
                        label,
                        isRequired,
                        required,
                        labelWrapperStyle,
                        labelStyle,
                        id
                    }}
                    className={setClassName({ name: 'field__label' })}
                />
                <OutsideEventContainer callback={onClickOutside}>
                    <StyledChildGrabber
                        {...{ childGrabberStyle }}
                        className={setClassName({ name: 'field__children-wrapper' })}>
                        <StyledFieldInner
                            {...{ colors, ref: fieldInnerRef, className: focused ? 'focus' : '' }}
                            {...{
                                disabled,
                                innerStyle,
                                fieldSize,
                                validationResult,
                                readOnly,
                                haveArrows
                            }}
                            {...{ onMouseEnter, onMouseLeave, onKeyDown, onKeyUp, onClick: onClickAndSetInputFocus }}
                            className={setClassName({ name: 'field__inner-content' })}>
                            <LoaderComponent {...{ isLoading, wrapperStyle: loaderStyle }} />
                            {renderPrefix()}
                            <StyledInputWrapper
                                {...{ fieldSize, inputWrapperStyle, isTextArea }}
                                className={setClassName({ name: 'field__input-wrapper' })}>
                                <StyledInput
                                    size={prefix && 1}
                                    {...{ ref: inputRef, id, as, isTextArea, rows: isTextArea ? 1 : undefined, type }}
                                    {...{
                                        validationResult,
                                        fieldSize,
                                        disabled,
                                        readOnly,
                                        colors,
                                        inputStyle,
                                        ...rest
                                    }}
                                    {...{
                                        areaHeight,
                                        onBlur,
                                        onChange,
                                        onFocus,
                                        required: isRequired || required,
                                        icon
                                    }}
                                    className={setClassName({ name: 'field__input' })}
                                />
                                <StyledInputBackground
                                    {...{
                                        haveArrows,
                                        fieldSize,
                                        inputBackgroundStyle
                                    }}
                                    className={setClassName({ name: 'field__background' })}
                                />
                            </StyledInputWrapper>
                            {icon && renderIcon()}
                            {type === 'number' && onArrowPressProps && renderArrows()}
                        </StyledFieldInner>
                        {children}
                    </StyledChildGrabber>
                </OutsideEventContainer>
                <Comment
                    {...{
                        _mB,
                        validationResult,
                        validationError,
                        comment,
                        colors,
                        wrapperStyle: commentWrapperStyle,
                        errorStyle: commentValidationErrorStyle,
                        commentStyle: commentTextStyle
                    }}
                    className={setClassName({ name: 'field__comment' })}
                />
            </StyledFieldWrapper>
        );
    }
}

Field.displayName = 'Field';
Field.propTypes = {
    /** Defines value of component */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines placeholder of component */
    placeholder: PropTypes.string,
    /** Defines label of component */
    label: PropTypes.string,
    /** Defines whether checkbox is disabled */
    disabled: PropTypes.bool,
    /** Defines name of component */
    name: PropTypes.string,
    /** if you need to test or mark input */
    id: PropTypes.string,
    /** Defines type of component */
    type: PropTypes.oneOf([
        'text',
        'tel',
        'password',
        'email',
        'number',
        'date',
        'datetime-local',
        'month',
        'time',
        'url',
        'week'
    ]),
    /** Set virtual keyboard type */
    inputmode: PropTypes.oneOf(['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url']),
    /** Defines whether field should be validated */
    validation: PropTypes.oneOfType([PropTypes.bool, PropTypes.func], null),
    /** Defines validation error message */
    validationError: PropTypes.string,
    /** Defines comment of component */
    comment: PropTypes.string,
    /** Defines field size */
    fieldSize: PropTypes.oneOf(['sm', 'md', 'lg']),
    /** Change size of spacer in Field */
    marginBottom: PropTypes.number,
    /** Short name prop of change size of spacer in Field */
    mB: PropTypes.number,
    /** Defines icon of component */
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.func]),
    /** Defines prefix of component */
    prefix: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /** Defines text or any node that will be placed in a body of the component */
    children: PropTypes.node,
    /** Deprecated. Consider using corresponding record in `styles` prop. Defines input style of component */
    inputStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** Deprecated. Consider using corresponding record in `styles` prop. Defines additional css for wrapper */
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** Deprecated. Consider using corresponding record in `styles` prop. Defines inner style of component */
    innerStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** Deprecated. Consider using corresponding record in `styles` prop. custom styles for StyledLabel */
    labelStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** Deprecated. Consider using corresponding record in `styles` prop. custom styles for StyledLabelWrapper */
    labelWrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** Deprecated. Consider using corresponding record in `styles` prop. custom styles for StyledInputWrapper */
    inputWrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** Deprecated. Consider using corresponding record in `styles` prop. custom styles for StyledInputBackground */
    inputBackgroundStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    /** Styling object for all specific units */
    styles: PropTypes.shape({
        Input: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        Wrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        InputInner: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        LabelContent: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        LabelWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        InputWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        InputBackground: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        ChildGrabber: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        Loader: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        CommentWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        CommentValidationError: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        CommentText: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object])
    }),
    /** Defines additional className */
    className: PropTypes.string,
    /** Autoselect text in input on focus */
    autoSelect: PropTypes.bool,
    /** Native autoComplete */
    autoComplete: PropTypes.oneOf(['off', 'on']),
    /** Callback that fires when state changes, func(e) */
    onChange: PropTypes.func,
    /** Callback that fires when component focused, func(e) */
    onFocus: PropTypes.func,
    /** Callback that fires when component blurred, func(e) */
    onBlur: PropTypes.func,
    /** Callback that fires on mouse click outside of component */
    onClickOutside: PropTypes.func,
    /** Callback that fires on arrow press, func(e, direction) */
    onArrowPress: PropTypes.func,
    /** Callback that fires when mouse enters component */
    onMouseEnter: PropTypes.func,
    /** Callback that fires when mouse leaves component */
    onMouseLeave: PropTypes.func,
    /** Callback that fires on key down */
    onKeyDown: PropTypes.func,
    /** Callback that fires on key up */
    onKeyUp: PropTypes.func,
    /** Defines whether field is required */
    isRequired: PropTypes.bool,
    /** alias for isRequired */
    required: PropTypes.bool,
    /** expand or not textarea */
    expandArea: PropTypes.bool,
    /** Turn on loading */
    isLoading: PropTypes.bool,
    /** For multi string input */
    as: PropTypes.string
};
Field.defaultProps = {
    type: 'text',
    isRequired: false,
    fieldSize: 'lg',
    marginBottom: 30,
    disabled: false,
    isLoading: false,
    validation: null,
    autoComplete: 'on',
    styles: {},
    onClickOutside: () => {}
};

export default withColors(Field);
