import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { ColorsContext } from 'lib-root/colors';

import { Box, Icon, Loader, StyledInput, StyledWrapper } from './units';

import { getColorScheme, switchSizes as switchSizesDefault, handleKeyUp } from './utils';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * Переключатель
 */
const Switch = React.forwardRef(
    (
        {
            className,
            isControlled,
            colorSchemeExtra,
            switchSizesExtra,
            onCheckChange,
            checkedIcon,
            uncheckedIcon,
            isLoading,
            iconsType,
            elmSize,
            animationDuration,
            disabled: disabledByProps,
            checked: checkedByProps,
            wrapperStyle,
            thumbStyle,
            boxStyle,
            loaderProps,
            ...restProps
        },
        ref
    ) => {
        const colors = useContext(ColorsContext);

        // Init hooks
        const [focused, setFocused] = useState(false);
        const [controlledChecked, setControlledChecked] = useState(checkedByProps);

        // Deciding how to handle checking
        const handleCheck = (newCheckedState) => {
            if (checked === newCheckedState) return;
            if (!isControlled) {
                setControlledChecked(newCheckedState);
            }
            if (onCheckChange) onCheckChange(newCheckedState);
        };

        // Calculating further props
        const checked = isControlled ? checkedByProps : controlledChecked;
        const disabled = isLoading ? true : disabledByProps;

        // Extending configs and choosing suiting ones
        const colorScheme = { ...getColorScheme(colors), ...colorSchemeExtra };
        const currentSwitchSizes = { ...switchSizesDefault, ...switchSizesExtra }[elmSize];

        return (
            <StyledWrapper
                {...{ isLoading, disabled, wrapperStyle }}
                className={setClassName({ props: { className }, name: 'switch' })}>
                <Box
                    {...{
                        checked,
                        isLoading,
                        disabled,
                        colorScheme,
                        currentSwitchSizes,
                        focused,
                        animationDuration,
                        thumbStyle,
                        boxStyle
                    }}>
                    <Icon {...{ checked, currentSwitchSizes, checkedIcon, uncheckedIcon, iconsType }} />
                    <StyledInput
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onChange={(e) => handleCheck(e.target.checked)}
                        onKeyUp={(e) => handleKeyUp(e.key, handleCheck)}
                        type="checkbox"
                        {...{ checked, ref, ...restProps }}
                    />
                </Box>
                <Loader {...{ currentSwitchSizes, isLoading, loaderProps }} />
            </StyledWrapper>
        );
    }
);

Switch.displayName = 'Switch';
Switch.propTypes = {
    /** State of the switch. In uncontrolled mode defines initial state */
    checked: PropTypes.bool,
    /** State of the component can't be changed by user if disabled is true */
    disabled: PropTypes.bool,
    /** Add loader atop of the component. Also switches component do disabled */
    isLoading: PropTypes.bool,
    /** Defines whether component checking controlled by externally or by itself */
    isControlled: PropTypes.bool,
    /** Emotion styles applied to the wrapper of component. Overrides default. */
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Overrides thumb styles. Receives emotion object or function, which handle component's props and returns emotion */
    thumbStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Overrides box styles. Receives emotion object or function, which handle component's props and returns emotion */
    boxStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Overrides props passed to loader component (look lib-ui/utils/LoaderComponent for details) */
    loaderProps: PropTypes.object,
    /** Overrides default color scheme object */
    colorSchemeExtra: PropTypes.object,
    /** Overrides default size based config  */
    switchSizesExtra: PropTypes.object,
    /** Defines which config will be applied to the switch */
    elmSize: PropTypes.oneOf(['sm', 'md']),
    /** Defines what icons (mentioned in config) will be shown on both sides of the Switch till not overwritten. No icons if undefined */
    iconsType: PropTypes.oneOf(['numeric', 'iconic']),
    /** Defines what icon (or any sign) will be shown when switch is checked. if not set, icon will be chosen by iconsType */
    checkedIcon: PropTypes.node,
    /** Defines what icon (or any sign) will be shown when switch is not checked. if not set, icon will be chosen by iconsType */
    uncheckedIcon: PropTypes.node,
    /** Defines how long checking animation lasts. In ms */
    animationDuration: PropTypes.number,
    /** Callback fires on check change, func(newCheckedState) */
    onCheckChange: PropTypes.func
};
Switch.defaultProps = {
    checked: true,
    disabled: false,
    isLoading: false,
    isControlled: true,
    elmSize: 'md',
    iconsType: undefined,
    colorSchemeExtra: {},
    switchSizesExtra: {},
    loaderProps: {},
    animationDuration: 300
};

export default Switch;
