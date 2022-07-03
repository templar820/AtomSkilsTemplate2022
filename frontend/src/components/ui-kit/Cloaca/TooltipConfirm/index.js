import React, { useCallback, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

import { Button, Tooltip } from 'lib-ui';
import { ColorsContext } from 'lib-root/colors';

import { TooltipBlock } from './units';
import { getBtnProps, calcWidth } from './utils';

/**
 * Используется для отображения всплывающей подсказки c подтверждением.
 */
const TooltipConfirm = React.forwardRef(
    (
        {
            tooltip,
            icon,
            buttonLeftText,
            buttonRightText,
            iconName,
            iconWidth,
            iconHeight,
            leftButtonStyle,
            leftButtonColorScheme,
            leftButtonColor,
            leftButtonDisabled,
            leftButtonFontSize,
            leftButtonSize,
            onClickLeft,
            rightButtonStyle,
            rightButtonColorScheme,
            rightButtonColor,
            rightButtonDisabled,
            rightButtonFontSize,
            rightButtonSize,
            onClickRight,
            paperStyle,
            width,
            ...restProps
        },
        ref
    ) => {
        const colors = useContext(ColorsContext);
        const btnClickLeft = useCallback(
            (e) => {
                if (onClickLeft) onClickLeft(e);
            },
            [onClickLeft]
        );
        const btnClickRight = useCallback(
            (e) => {
                if (onClickRight) onClickRight(e);
            },
            [onClickRight]
        );

        const leftBtnProps = useMemo(
            () =>
                getBtnProps(
                    colors,
                    leftButtonDisabled,
                    leftButtonColorScheme,
                    leftButtonColor,
                    leftButtonStyle,
                    leftButtonSize,
                    leftButtonFontSize,
                    btnClickLeft,
                    buttonLeftText
                ),
            [
                colors,
                leftButtonDisabled,
                leftButtonColorScheme,
                leftButtonColor,
                leftButtonStyle,
                leftButtonSize,
                leftButtonFontSize,
                btnClickLeft,
                buttonLeftText
            ]
        );
        const rightBtnProps = useMemo(
            () =>
                getBtnProps(
                    colors,
                    rightButtonDisabled,
                    rightButtonColorScheme,
                    rightButtonColor,
                    rightButtonStyle,
                    rightButtonSize,
                    rightButtonFontSize,
                    btnClickRight,
                    buttonRightText
                ),
            [
                colors,
                rightButtonDisabled,
                rightButtonColorScheme,
                rightButtonColor,
                rightButtonStyle,
                rightButtonSize,
                rightButtonFontSize,
                btnClickRight,
                buttonRightText
            ]
        );

        return (
            <Tooltip
                paperStyle={{ maxWidth: calcWidth({ width, icon }) }}
                {...{ ref, ...restProps }}
                tooltip={
                    <TooltipBlock {...{ iconName, iconWidth, iconHeight, tooltip, icon }}>
                        {buttonLeftText && <Button {...leftBtnProps} />}
                        {buttonRightText && <Button {...rightBtnProps} />}
                    </TooltipBlock>
                }
            />
        );
    }
);

TooltipConfirm.displayName = 'TooltipConfirm';
TooltipConfirm.propTypes = {
    ...Tooltip.PropTypes,
    /** Defines component's additional css */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines left button's text */
    buttonLeftText: PropTypes.string,
    /** Defines right button's text */
    buttonRightText: PropTypes.string,
    /** Defines whether icon should be shown */
    icon: PropTypes.bool,
    /** Defines name of an icon */
    iconName: PropTypes.string,
    /** Defines width of an icon */
    iconWidth: PropTypes.string,
    /** Defines height of an icon */
    iconHeight: PropTypes.string,
    /** Callback fires on left button click, func(e) */
    onClickLeft: PropTypes.func,
    /** Callback fires on right button click, func(e) */
    onClickRight: PropTypes.func,
    /** Defines left button's additional css */
    leftButtonStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines left button's color scheme */
    leftButtonColorScheme: PropTypes.oneOf(['primary', 'secondary', 'outline', 'white']),
    /** Defines left button's color */
    leftButtonColor: PropTypes.string,
    /** Defines whether left button is disabled */
    leftButtonDisabled: PropTypes.bool,
    /** Defines left button's font-size */
    leftButtonFontSize: PropTypes.number,
    /** Defines left button's size */
    leftButtonSize: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
    /** Defines right button's additional css */
    rightButtonStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines right button's color scheme */
    rightButtonColorScheme: PropTypes.oneOf(['primary', 'secondary', 'outline', 'white']),
    /** Defines right button's color */
    rightButtonColor: PropTypes.string,
    /** Defines whether right button is disabled */
    rightButtonDisabled: PropTypes.bool,
    /** Defines right button's font-size */
    rightButtonFontSize: PropTypes.number,
    /** Defines right button's size */
    rightButtonSize: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
    /** Defines additional className */
    className: PropTypes.string,
    /** Defines component's distance */
    distance: PropTypes.number,
    /** Defines component's width */
    width: PropTypes.number
};

TooltipConfirm.defaultProps = {
    iconWidth: '20px',
    iconHeight: '20px',
    distance: 14,
    rightButtonSize: 'sm',
    leftButtonSize: 'sm',
    leftButtonStyle: {
        marginRight: '10px'
    },
    leftButtonColor: 'info',
    rightButtonColor: 'errorAccent',
    leftButtonFontSize: 12,
    rightButtonFontSize: 12,
    leftButtonColorScheme: 'outline',
    rightButtonColorScheme: 'primary',
    leftButtonDisabled: false,
    rightButtonDisabled: false,
    tooltipPosition: 'bottom',
    tooltipAutoPosition: false
};

export default TooltipConfirm;
