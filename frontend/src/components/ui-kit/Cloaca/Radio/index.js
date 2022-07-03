import React, { useState, useContext, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import uuidv4 from 'uuid/v4';
import { ColorsContext } from 'lib-root/colors';

import { StyledLabel, StyledIcon, StyledCaption, CheckboxSvg } from './units';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * Компонент радио-кнопки.
 */
const RadioButton = React.forwardRef(
    (
        {
            className,
            disabled,
            checked,
            size,
            style,
            css: _css,
            children,
            children: isChildrenExist,
            onCheckChange,
            propId,
            onMouseEnter: _onMouseEnter,
            onMouseLeave: _onMouseLeave,
            ...restProps
        },
        ref
    ) => {
        const colors = useContext(ColorsContext);

        const [isHovered, setIsHovered] = useState(false);
        const { current: changeHover } = useRef(({ type }) => setIsHovered(type === 'mouseenter'));

        const onChange = useCallback(
            (e) => {
                if (onCheckChange) onCheckChange(e);
            },
            [onCheckChange]
        );

        const onMouseEnter = useCallback(
            (e) => {
                if (_onMouseEnter) _onMouseEnter(e);
                changeHover(e);
            },
            [_onMouseEnter]
        );

        const onMouseLeave = useCallback(
            (e) => {
                if (_onMouseLeave) _onMouseLeave(e);
                changeHover(e);
            },
            [_onMouseLeave]
        );

        const { current: id } = useRef(propId || uuidv4());

        return (
            <StyledLabel
                {...{ onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave }}
                {...{ colors, size, disabled, _css, style, isChildrenExist }}
                className={setClassName({ props: { className }, name: 'radio' })}>
                <input {...{ id, ref, disabled, checked, onChange, type: 'radio', hidden: true, ...restProps }} />
                <StyledIcon {...{ isHovered, colors, size, isChildrenExist }}>
                    <CheckboxSvg {...{ isHovered, disabled, checked, colors }} />
                </StyledIcon>
                <StyledCaption {...{ size }}>{children}</StyledCaption>
            </StyledLabel>
        );
    }
);

RadioButton.displayName = 'RadioButton';
RadioButton.propTypes = {
    /** Defines whether the component is checked */
    checked: PropTypes.bool,
    /** Defines name of component */
    name: PropTypes.string,
    /** Defines text or any node that will be placed in a body of the component */
    children: PropTypes.node,
    /** Defines font-size */
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Callback that fires when component's state has changed, func(e) */
    onCheckChange: PropTypes.func,
    /** Callback fires then cursor enter on component, func(e)*/
    onMouseEnter: PropTypes.func,
    /** Callback fires then cursor leave on component, func(e)*/
    onMouseLeave: PropTypes.func,
    /** Defines whether the component is disabled */
    disabled: PropTypes.bool,
    /** Defines coponent's additional style */
    style: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines coponent's additional css */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines additional className */
    className: PropTypes.string
};
RadioButton.defaultProps = {
    checked: false,
    disabled: false,
    size: '16px'
};

export default RadioButton;
