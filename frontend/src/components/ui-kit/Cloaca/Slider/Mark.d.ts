import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';
import { LabelFormatterProps } from './';

export interface MarkProps {
    barLength?: number;
    barWidth?: number;
    color?: string;
    // If passed function, it will be used to render slider's label.
    // If passed string, it will be used as suffix.
    labelFormatter?: ((formatterProps: LabelFormatterProps) => string) | string;
    max?: number;
    markCircleStyle: EmotionStylesType;
    markLabelStyle: EmotionStylesType;
    min?: number;
    orientation?: 'horizontal' | 'vertical';
    showCaption?: boolean;
    step?: number;
    value?: number;
    variant?: 'sm' | 'lg';
}

declare const Mark: React.ComponentType<MarkProps>;

export default Mark;
