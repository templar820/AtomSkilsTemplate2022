import * as React from 'react';
import { NavigationProps } from 'lib-ui/Navigation';

export interface NavigationWithPresetProps extends NavigationProps {
    preset: 'normal' | 'narrow';
}

declare const NavigationWithPreset: React.ComponentType<NavigationWithPresetProps>;

export default NavigationWithPreset;
