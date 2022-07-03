import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

export interface SwitchProps {
    /** State of the switch. In uncontrolled mode defines initial state */
    checked?: boolean;
    /** State of the component can't be changed by user if disabled is true */
    disabled?: boolean;
    /** Add loader atop of the component. Also switches component do disabled */
    isLoading?: boolean;
    /** Defines whether component checking controlled by externally or by itself */
    isControlled?: boolean;
    /** Emotion styles applied to the wrapper of component. Overrides default. */
    wrapperStyle?: EmotionStylesType;
    /** Overrides thumb styles. Receives emotion object or function, which handle component's props and returns emotion */
    thumbStyle?: EmotionStylesType;
    /** Overrides box styles. Receives emotion object or function, which handle component's props and returns emotion */
    boxStyle?: EmotionStylesType;
    /** Overrides props passed to loader component (look lib-ui/utils/LoaderComponent for details) */
    loaderProps?: object;
    /** Overrides default color scheme object */
    colorSchemeExtra?: object;
    /** Overrides default size based config  */
    switchSizesExtra?: object;
    /** Defines which config will be applied to the switch */
    elmSize?: 'sm' | 'md';
    /** Defines what icons (mentioned in config) will be shown on both sides of the Switch till not overwritten. No icons if undefined */
    iconsType?: 'numeric' | 'iconic';
    /** Defines what icon (or any sign) will be shown when switch is checked. if not set, icon will be chosen by iconsType */
    checkedIcon?: React.ReactNode;
    /** Defines what icon (or any sign) will be shown when switch is not checked. if not set, icon will be chosen by iconsType */
    uncheckedIcon?: React.ReactNode;
    /** Defines how long checking animation lasts. In ms */
    animationDuration?: number;
    /** Callback fires on check change, func(newCheckedState) */
    onCheckChange?: (newCheckedState: boolean) => void;
}

declare const Switch: React.ComponentType<SwitchProps>;

export default Switch;
