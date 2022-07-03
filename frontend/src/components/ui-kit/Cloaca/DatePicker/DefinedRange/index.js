import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import Radio from 'lib-ui/Radio';
import Drawer from 'lib-ui/Drawer';
import Paper from 'lib-ui/Paper';
import Field from 'lib-ui/Field';

import { autoAddPx } from 'lib-root/utils/styleMixins';

import { defaultInputRanges, defaultStaticRanges } from '../defaultRanges';
import { rangeShape } from '../DayCell';

import { withColors } from 'lib-root/components/utils';

import {
    StyledRangeWrap,
    StyledRangeLabel,
    StyledArrow,
    StyledRangePick,
    StyledHeader,
    StyledWrap,
    StyledHeaderText,
    StyledHeaderCloseBtn,
    StyledIntervalsWrap,
    StyledInputsWrap
} from './units';
import { setClassName } from 'lib-root/utils/styleMixins';
import { capitalize } from 'lib-root/utils';

class DefinedRanges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeOffset: 0,
            focusedInput: -1,
            isOpen: false
        };
        this.handleRangeChange = this.handleRangeChange.bind(this);
    }

    staticRanges = this.props.staticRanges.map((range) => ({
        ...range,
        disabled: !this.props.showedStaticRanges.includes(range.id)
    }));

    handleRangeChange(range) {
        const { onChange, ranges, focusedRange } = this.props;
        const selectedRange = ranges[focusedRange[0]];
        if (!onChange || !selectedRange) return;
        onChange({
            range: {
                [selectedRange.key || `range${focusedRange[0] + 1}`]: { ...selectedRange, ...range }
            }
        });
    }

    getSelectedRange(ranges, staticRange) {
        const focusedRangeIndex = ranges.findIndex((range) => {
            if (!range.startDate || !range.endDate || range.disabled) return false;
            return staticRange.isSelected(range);
        });
        const selectedRange = ranges[focusedRangeIndex];
        return { selectedRange, focusedRangeIndex };
    }

    getCurrentSelectedRangeLabel = () => {
        const { inputRanges, ranges } = this.props;

        const { label } =
            this.staticRanges.find((staticRange) => {
                const { selectedRange } = this.getSelectedRange(ranges, staticRange);
                return selectedRange;
            }) || {};

        let value = null;
        const { label: _label } =
            inputRanges.find((inputRange) => {
                const range = ranges.find((range) => {
                    if (!range.startDate || !range.endDate || range.disabled) return false;
                    return !isNaN(parseInt(inputRange.getCurrentValue(range), 10));
                });
                if (range) {
                    value = parseInt(inputRange.getCurrentValue(range), 10);
                }
                return range;
            }) || {};

        return label || (_label ? `${value} ${_label(value)}` : '');
    };

    render() {
        const {
            onPreviewChange,
            ranges,
            renderStaticRangeLabel,
            rangeColors,
            colors,
            showInputRanges,
            className,
            drawerHeight,
            closeOnChoose,
            radioProps
        } = this.props;
        const { isOpen } = this.state;

        const rangeLabel = this.getCurrentSelectedRangeLabel();

        return (
            <>
                <StyledRangePick
                    {...{ className }}
                    onClick={(e) => {
                        this.setState({ isOpen: !isOpen });
                    }}>
                    <StyledRangeLabel
                        isActive={rangeLabel}
                        {...{ colors, className: setClassName({ name: 'defined-ranges-picker__ranges-label' }) }}>
                        {rangeLabel || 'Преднастроенные интервалы'}
                    </StyledRangeLabel>
                    <StyledArrow isActive={rangeLabel} {...{ colors }} />
                </StyledRangePick>
                <Drawer
                    {...{
                        isOpen,
                        overlay: true,
                        overflowStyle: css`
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                        `,
                        curtainStyle: css`
                            overflow-y: hidden;
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                        `,
                        size: autoAddPx(drawerHeight)
                    }}>
                    <Paper
                        css={css`
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                        `}>
                        <StyledWrap className={setClassName({ name: 'defined-ranges__wrap' })}>
                            <StyledHeader {...{ colors, className: setClassName({ name: 'defined-ranges__header' }) }}>
                                <StyledHeaderText className={setClassName({ name: 'defined-ranges__header' })}>
                                    Преднастроенные интервалы
                                </StyledHeaderText>
                                <StyledHeaderCloseBtn
                                    className={setClassName({ name: 'defined-ranges__close' })}
                                    icon={'Sys_Cross_exit_rounded'}
                                    onClick={() => this.setState({ isOpen: false })}
                                />
                            </StyledHeader>
                            <StyledIntervalsWrap className={setClassName({ name: 'defined-ranges__intervals' })}>
                                {this.staticRanges
                                    .filter((staticRange) => !staticRange.disabled)
                                    .map((staticRange, i) => {
                                        const { selectedRange, focusedRangeIndex } = this.getSelectedRange(
                                            ranges,
                                            staticRange
                                        );
                                        let labelContent;

                                        if (staticRange.hasCustomRendering) {
                                            labelContent = renderStaticRangeLabel({ staticRange });
                                        } else {
                                            labelContent = staticRange.label;
                                        }

                                        return (
                                            <StyledRangeWrap
                                                key={i}
                                                className={setClassName({ name: 'defined-ranges__range' })}>
                                                <Radio
                                                    name={labelContent}
                                                    colors={colors}
                                                    onClick={() => {
                                                        this.handleRangeChange(
                                                            staticRange.range(this.props),
                                                            labelContent
                                                        );
                                                        if (closeOnChoose) this.setState({ isOpen: false });
                                                    }}
                                                    onFocus={() =>
                                                        onPreviewChange({ range: staticRange.range(this.props) })
                                                    }
                                                    onMouseEnter={() =>
                                                        onPreviewChange({ range: staticRange.range(this.props) })
                                                    }
                                                    onMouseLeave={() => {
                                                        onPreviewChange({});
                                                    }}
                                                    checked={!!selectedRange}
                                                    css={css`
                                                        width: 100%;
                                                        padding-top: 4px;
                                                    `}
                                                    style={{
                                                        color: selectedRange
                                                            ? colors[selectedRange.color] ||
                                                              selectedRange.color ||
                                                              colors[rangeColors[focusedRangeIndex]] ||
                                                              rangeColors[focusedRangeIndex]
                                                            : null
                                                    }}
                                                    {...radioProps}>
                                                    {labelContent}
                                                </Radio>
                                            </StyledRangeWrap>
                                        );
                                    })}
                            </StyledIntervalsWrap>
                            <StyledInputsWrap className={setClassName({ name: 'defined-ranges__inputs' })}>
                                {showInputRanges &&
                                    this.props.inputRanges
                                        .filter((inputRange) => !inputRange.disabled)
                                        .map((rangeOption, i, array) => (
                                            <Field
                                                key={rangeOption.label}
                                                label={
                                                    typeof rangeOption.label === 'function'
                                                        ? capitalize(rangeOption.label())
                                                        : rangeOption.label
                                                }
                                                fieldSize={'md'}
                                                onFocus={() => this.setState({ focusedInput: i, rangeOffset: 0 })}
                                                onBlur={() => this.setState({ rangeOffset: 0 })}
                                                onChange={(e) => {
                                                    let value = parseInt(e.target.value, 10);
                                                    value = isNaN(value) ? 0 : Math.max(Math.min(99999, value), 0);
                                                    this.handleRangeChange(rangeOption.range(value, this.props));
                                                }}
                                                type={'number'}
                                                min={0}
                                                max={99999}
                                                onArrowPress={(_, dir) => {
                                                    let value = rangeOption.getCurrentValue(
                                                        ranges[this.props.focusedRange[0]] || {}
                                                    );
                                                    value = dir === 'up' ? value + 1 : value - 1;
                                                    value = isNaN(value) ? 0 : Math.max(Math.min(99999, value), 0);
                                                    this.handleRangeChange(rangeOption.range(value, this.props));
                                                }}
                                                value={
                                                    rangeOption.getCurrentValue
                                                        ? rangeOption.getCurrentValue(
                                                              ranges[this.props.focusedRange[0]] || {}
                                                          )
                                                        : ''
                                                }
                                                styles={{ LabelWrapper: { marginTop: 26 } }}
                                                marginBottom={array.length - 1 === i ? 0 : 24}
                                            />
                                        ))}
                            </StyledInputsWrap>
                        </StyledWrap>
                    </Paper>
                </Drawer>
            </>
        );
    }
}

DefinedRanges.displayName = 'DefinedRanges';
DefinedRanges.propTypes = {
    /** Inputs to select ranges */
    inputRanges: PropTypes.array,
    /** Buttons ti select static ranges */
    staticRanges: PropTypes.array,
    /** Showed select static ranges */
    showedStaticRanges: PropTypes.array,
    /** Array with all selected ranges, [{ startDate, endDate, color, key, autoFocus, disabled, showDateDisplay}] */
    ranges: PropTypes.arrayOf(rangeShape),
    /** Show which ranges are in focus */
    focusedRange: PropTypes.arrayOf(PropTypes.number),
    /** Callback fires then preview change, func({ range })
     * range - rangeShape or undefined
     * */
    onPreviewChange: PropTypes.func,
    /** Callback fires then ranges choose change, fun({ range: { range1, range2, rangeKey } })
     * range - set of rangeShape */
    onChange: PropTypes.func,
    /** Colors for all not specific ranges use by index of color */
    rangeColors: PropTypes.arrayOf(PropTypes.string),
    /** ClassName to wrapper component to style by styled */
    className: PropTypes.string,
    /** Custom label render func: func({staticRange})
     * staticRange - range object
     * */
    renderStaticRangeLabel: PropTypes.func,
    /** If set to true, then showing inputs to select ranges */
    showInputRanges: PropTypes.bool,
    /** Defines height on animate drawer */
    drawerHeight: PropTypes.number,
    /** Defines close drawer or not on choose range */
    closeOnChoose: PropTypes.bool,
    /** Object of props to all Radio components */
    radioProps: PropTypes.object
};

DefinedRanges.defaultProps = {
    inputRanges: defaultInputRanges,
    staticRanges: defaultStaticRanges,
    showedStaticRanges: ['today', 'yesterday', 'thisWeek', 'thisMonth', 'thisYear'],
    ranges: [],
    rangeColors: ['primary', 'primaryAccent', 'info'],
    focusedRange: [0, 0],
    showInputRanges: true,
    onPreviewChange: () => null,
    drawerHeight: 0,
    closeOnChoose: true,
    radioProps: {}
};

export default withColors(DefinedRanges);
