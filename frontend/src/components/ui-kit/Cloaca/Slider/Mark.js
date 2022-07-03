import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { ColorsContext } from 'lib-root/colors';

import { convertPointsToPixels, getLabel } from 'lib-ui/Slider/utils';
import { StyledCircle, StyledCircleLabel } from 'lib-ui/Slider/units';
import { resolveProps } from 'lib-root/utils';

const Mark = React.forwardRef(
    (
        {
            barLength,
            barWidth,
            className,
            color,
            labelSuffix, // DEPRECATED. Consider using labelFormatter prop instead. Defines suffix for labels
            labelFormatter: _labelFormatter,
            max,
            markCircleStyle,
            markLabelStyle,
            min,
            orientation,
            step,
            showCaption,
            value,
            variant,
            ...restProps
        },
        ref
    ) => {
        const colors = useContext(ColorsContext);
        const position = convertPointsToPixels({ length: barLength, max, min, value });
        const labelFormatter = resolveProps(labelSuffix, _labelFormatter);

        return (
            <>
                <StyledCircle
                    {...{
                        className: `${className}-circle`,
                        barWidth,
                        colors,
                        color,
                        markCircleStyle,
                        orientation,
                        position,
                        ref,
                        variant,
                        ...restProps
                    }}
                />
                {// Shows captions if enabled. Excludes captions at start and end positions (they have shown in the Slider component).
                showCaption && position !== 0 && position !== barLength && (
                    <StyledCircleLabel
                        {...{
                            className: `${className}-label`,
                            colors,
                            barWidth,
                            markLabelStyle,
                            orientation,
                            position
                        }}>
                        {getLabel(value, labelFormatter, { min, max, step, orientation, placement: 'mark' })}
                    </StyledCircleLabel>
                )}
            </>
        );
    }
);

Mark.propTypes = {
    barLength: PropTypes.number,
    barWidth: PropTypes.number,
    color: PropTypes.string,
    labelFormatter: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    max: PropTypes.number,
    markCircleStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    markLabelStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    min: PropTypes.number,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    showCaption: PropTypes.bool,
    step: PropTypes.number,
    value: PropTypes.number,
    variant: PropTypes.oneOf(['sm', 'lg'])
};

Mark.defaultProps = {
    disabled: false,
    value: 0,
    variant: 'lg'
};

export default Mark;
