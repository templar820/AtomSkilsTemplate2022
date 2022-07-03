import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { hexToRGBA } from 'lib-root/utils/styleMixins';
import { ColorsContext } from 'lib-root/colors';
import { positionUtils, resolveProps } from 'lib-root/utils';
import { setClassName } from 'lib-root/utils/styleMixins';
import { useWindowListener } from 'lib-root/utils';

import { compareValues, convertPixelsToPoints, getDecimalsLength, getLabel, normalize } from 'lib-ui/Slider/utils';

import Field from 'lib-ui/Field';

import ControlMark from 'lib-ui/Slider/ControlMark';
import Mark from 'lib-ui/Slider/Mark';

import { Bar, StyledCircleLabel as LastLabel, StyledFieldWrapper, StyledWrapper } from 'lib-ui/Slider/units';

const Slider = React.forwardRef(
    (
        {
            barColor,
            barWidth,
            className,
            dots,
            fieldProps,
            fillerColor,
            labelSuffix, // DEPRECATED. Consider using labelFormatter prop instead. Defines suffix for labels
            labelFormatter: _labelFormatter,
            marks,
            max,
            min,
            onChange,
            orientation,
            point,
            showCaption,
            showInput,
            step: propStep,
            styles = {},
            value: propValue,
            wrapperStyle: _deprecatedWrapperStyle
        },
        ref
    ) => {
        const barRef = useRef();
        const wrapperRef = useRef();
        const markRef = useRef();

        const {
            SliderWrapper: _sliderWrapperStyle,
            Bar: barStyle,
            FieldWrapper: fieldWrapperStyle,
            ControlMarkCircle: controlMarkCircleStyle,
            ControlMarkLabel: controlMarkLabelStyle,
            MarkCircle: markCircleStyle,
            MarkLabel: markLabelStyle,
            LastLabel: lastLabelStyle
        } = styles;
        const sliderWrapperStyle = resolveProps(_deprecatedWrapperStyle, _sliderWrapperStyle);
        const labelFormatter = resolveProps(_labelFormatter, labelSuffix);
        const [barLength, setBarLength] = useState(0); // in pixels
        const [barPosition, setBarPosition] = useState(0); // in pixels
        const [step, setStep] = useState(Slider.defaultProps.step);
        const [steps, setSteps] = useState([]); // array of marks (in points)
        const [value, setValue] = useState(0); // in points

        const colors = useContext(ColorsContext);
        const _barColor = colors[barColor] || barColor || hexToRGBA(colors.GrayScale_100, 0.5);
        const _fillerColor = colors[fillerColor] || fillerColor;

        const convertPositionToPercent = (position) => {
            if (max === min) return 0;

            const calcPercent = (pos) => ((pos - min) / (max - min)) * 100;

            if (Array.isArray(position)) {
                return position.map((item) => calcPercent(item));
            }

            return calcPercent(position);
        };

        const getNearestStepValue = (newValue) => {
            let nearIndex = 0,
                minPath = newValue - steps[0],
                nextPath;

            // Check every step until find the shortest path.
            for (let i = 1; i < steps.length; i++) {
                nextPath = Math.abs(newValue - steps[i]);

                // If the current path is shorter than the previous one, check the next path.
                if (minPath > nextPath) {
                    minPath = nextPath;
                    nearIndex = i;
                } else {
                    // If the current path is longer, break the loop. Previous path is the shortest.
                    break;
                }
            }

            return steps[nearIndex];
        };

        const handleArrowPress = (e, payload) => {
            updateValues(payload === 'up' ? value + step : value - step);
        };

        const handleBarClick = ({ clientX: x, clientY: y, target }) => {
            if (target !== markRef.current && !markRef.current.contains(target)) {
                const clickPosition = isVertical() ? barPosition - y : x - barPosition;

                const newValue = convertPixelsToPoints({ length: barLength, max, min, value: clickPosition });

                if (!Array.isArray(value)) {
                    updateValues(newValue);
                } else {
                    // Determines the index of the near control circle.
                    const nearValueIndex = Math.abs(newValue - value[0]) < Math.abs(newValue - value[1]) ? 0 : 1;

                    updateValues(newValue, nearValueIndex);
                }
            }
        };

        const isValueInRange = (value) => value >= min && value <= max;

        const isVertical = () => orientation === 'vertical';
        const actualWrapperRef = () => ref || wrapperRef;
        const normalizeValue = (value) => {
            if (Array.isArray(value)) {
                switch (value.length) {
                    case 0:
                        return 0;
                    case 1:
                        return normalize(value);
                    default:
                        const _value = [...value];
                        // max value.length == 2
                        _value.splice(2);
                        _value.map(normalize);
                        return _value.sort();
                }
            }

            // Returns '0' if the value type is not a number.
            if (isNaN(value)) return 0;

            return normalize({ max, min, value });
        };

        const renderControlCircles = (color) => {
            // Converts value to Array if necessary
            const _value = Array.isArray(value) ? value : [value];

            return _value.map((value, index) => (
                <ControlMark
                    key={index}
                    className={setClassName({ name: 'slider__control-mark' })}
                    {...{
                        barLength,
                        barWidth,
                        color,
                        index,
                        labelFormatter,
                        max,
                        markRef,
                        min,
                        controlMarkCircleStyle,
                        controlMarkLabelStyle,
                        onControlMarkMove: updateValues,
                        orientation,
                        showCaption,
                        step,
                        value
                    }}
                />
            ));
        };

        const renderMarkCircles = (colors, fillerColor) => {
            if (!Array.isArray(marks) || !marks.length) return null;

            const getCircleColor = (val) => {
                // If the Bar does not exist, the color is always gray.
                if (point) return colors.GrayScale_200;

                if (Array.isArray(value)) {
                    return val < Math.min(...value) || val > Math.max(...value) ? colors.GrayScale_200 : fillerColor;
                }

                if (val > value) return colors.GrayScale_200;

                return fillerColor;
            };

            return (
                <>
                    {marks.filter(isValueInRange).map((value, index) => (
                        <Mark
                            className={setClassName({ name: 'slider__mark' })}
                            key={index}
                            {...{
                                barLength,
                                barWidth,
                                color: getCircleColor(value),
                                labelFormatter,
                                max,
                                min,
                                markCircleStyle,
                                markLabelStyle,
                                orientation,
                                showCaption,
                                value,
                                variant: 'sm'
                            }}
                        />
                    ))}
                </>
            );
        };

        const renderSideLabel = (colors, isFinal = false) => {
            const color = isFinal ? colors.errorAccent : colors.GrayScale_900;
            const labelValue = isFinal ? max : min;

            return (
                <LastLabel
                    className={setClassName({ name: 'slider__last-label' })}
                    {...{
                        barWidth,
                        color,
                        orientation,
                        position: isFinal ? barLength : 0,
                        markLabelStyle: lastLabelStyle
                    }}>
                    {getLabel(labelValue, labelFormatter, { min, max, step, orientation, placement: 'last' })}
                </LastLabel>
            );
        };

        const setStepValues = () => {
            // Only values from marks can be selected if dots is true.
            if (marks && dots) {
                // filter: remove marks which are not in range
                const nMarks = marks.filter(isValueInRange);

                setSteps([...nMarks]);

                /** It's not necessary to return an array of labels, but we need to interrupt the function.
                 * It seems like a good idea to return an array for the future. */
                return [...nMarks];
            }

            const decimalsLength = getDecimalsLength(step);

            let accumulator = min;
            const steps = [];

            while (accumulator <= max) {
                steps.push(decimalsLength ? +accumulator.toFixed(decimalsLength) : accumulator);
                accumulator += step;
            }

            setSteps(steps);

            return [...steps];
        };

        const updateValues = (newValue, index) => {
            let _value;

            if (!Array.isArray(value)) {
                _value = getNearestStepValue(newValue);
            } else {
                _value = [...value];
                _value[index] = getNearestStepValue(newValue);
            }

            // Call onChange function
            onChange && onChange(_value);

            setValue(_value);
        };

        const updateBarLength = () => {
            const barPosition = positionUtils.getPositionOnPage(barRef.current);
            setBarLength(isVertical() ? barPosition.height : barPosition.width);
        };

        const adjustBarLength = () => {
            if (barRef.current) {
                const dimension = isVertical() ? 'height' : 'width';
                const barSize = positionUtils.getPositionOnPage(barRef.current)[dimension];
                if (barSize !== barLength) {
                    setBarLength(barSize);
                }
            }
        };

        // on mount effect
        useEffect(() => {
            const _value = normalizeValue(propValue);
            updateBarLength();

            setBarPosition(isVertical() ? barPosition.onDocumentY + barPosition.height : barPosition.onDocumentX);
            // if 'step' value from props equals 0, set 'step' value to default value
            setStep(propStep || Slider.defaultProps.step);
            setValue(_value);

            // fill steps array
            setStepValues();
            const actualWrapperElement = actualWrapperRef().current;

            // change bar length on wrapper size change
            // actualWrapperElement.parentNode.style.transition = 'width 5ms, height 5ms';

            // Add nominal width/height transition to parent if no any
            const dimension = isVertical() ? 'height' : 'width';
            const parentNodeTransition = actualWrapperElement.parentNode.style.transition;
            if (!parentNodeTransition.match('all') && !parentNodeTransition.match(dimension)) {
                actualWrapperElement.parentNode.style.transition += `${
                    parentNodeTransition ? ', ' : ''
                }${dimension} 5ms`;
            }

            actualWrapperElement.addEventListener('transitionrun', adjustBarLength);
            actualWrapperElement.parentNode.addEventListener('transitionrun', adjustBarLength);
            return () => {
                actualWrapperElement.removeEventListener('transitionrun', adjustBarLength);
                actualWrapperElement.parentNode.removeEventListener('transitionrun', adjustBarLength);
            };
        }, []);

        useEffect(() => {
            const _value = normalizeValue(propValue);
            // Updates state if new value has taken from props
            if (!compareValues(value, _value)) {
                setValue(_value);
            }
        }, [propValue]);

        useWindowListener(updateBarLength);
        return (
            <StyledWrapper
                {...{ orientation, ref: actualWrapperRef(), wrapperStyle: sliderWrapperStyle }}
                className={setClassName({ props: { className }, name: 'slider' })}>
                <Bar
                    className={setClassName({ name: 'slider__bar' })}
                    ref={barRef}
                    onClick={handleBarClick}
                    {...{
                        barColor: _barColor,
                        barStyle,
                        barWidth,
                        orientation,
                        showCaption
                    }}>
                    {!point && (
                        <Bar
                            {...{
                                barColor: _fillerColor,
                                barWidth,
                                isFiller: true,
                                orientation,
                                value: convertPositionToPercent(value)
                            }}
                        />
                    )}
                    {marks && renderMarkCircles(colors, _fillerColor)}
                    {showCaption && renderSideLabel(colors)}
                    {showCaption && renderSideLabel(colors, true)}
                    {renderControlCircles(_fillerColor)}
                </Bar>
                {showInput && !Array.isArray(value) && (
                    <StyledFieldWrapper
                        {...{ orientation, fieldWrapperStyle }}
                        className={setClassName({ name: 'slider__field-wrapper' })}>
                        <Field
                            type={'number'}
                            fieldSize={'sm'}
                            onArrowPress={handleArrowPress}
                            marginBottom={0}
                            {...{ max, min, value, ...fieldProps }}
                        />
                    </StyledFieldWrapper>
                )}
            </StyledWrapper>
        );
    }
);

Slider.displayName = 'Slider';

Slider.propTypes = {
    // Bar's background color
    barColor: PropTypes.string,
    // Width of the bar
    barWidth: PropTypes.number,
    // If true, only values from marks can be selected
    dots: PropTypes.bool,
    // Color of child filler. By default defined through status color
    fillerColor: PropTypes.string,
    // Function that will be used to render slider's label
    labelFormatter: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    // Array of marks
    marks: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    // Max enabled value
    max: PropTypes.number,
    // Min enabled value
    min: PropTypes.number,
    // Callback fires on change. Return number or arrayOf(numbers)
    onChange: PropTypes.func,
    // Bar orientation
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    // If true, filler bar is not displayed
    point: PropTypes.bool,
    // Defines whether caption will be shown or not
    showCaption: PropTypes.bool,
    // Defines whether control input will be shown or not. Input is not showed if type of 'value' is Array
    showInput: PropTypes.bool,
    // Defines step
    step: PropTypes.number,
    // Defines value(-es)
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    // Styles for wrapper
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    //** Props for Field */
    fieldProps: PropTypes.object,
    /* Styling object for slider's elements */
    styles: PropTypes.shape({
        SliderWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        Bar: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        FieldWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        ControlMarkCircle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        ControlMarkLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        MarkCircle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        MarkLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        LastLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
    })
};

Slider.defaultProps = {
    barWidth: 8,
    dots: false,
    fillerColor: 'primary',
    labelFormatter: '%',
    marks: false,
    max: 100,
    min: 0,
    orientation: 'horizontal',
    point: false,
    preserveHeight: true,
    showCaption: false,
    showInput: false,
    step: 1,
    value: 50
};

export default Slider;
