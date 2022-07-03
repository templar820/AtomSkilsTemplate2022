import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';
import { LabelFormatterProps } from './';

export interface ControlMarkProps {
    barLength?: number;
    barWidth?: number;
    color?: string;
    controlMarkCircleStyle: EmotionStylesType;
    controlMarkLabelStyle: EmotionStylesType;
    // Array index of the current mark. Or false if not applicable.
    index?: boolean | number;
    // If passed function, it will be used to render slider's label.
    // If passed string, it will be used as suffix.
    labelFormatter?: ((formatterProps: LabelFormatterProps) => string) | string;
    max?: number;
    min?: number;
    // Callback that fires when mark is moving
    onControlMarkMove?: (normalize: number, index: number) => void;
    orientation?: 'horizontal' | 'vertical';
    step?: number;
    value?: number;
    variant?: 'sm' | 'lg';
}

declare const ControlMark: React.ComponentType<ControlMarkProps>;

export default ControlMark;
