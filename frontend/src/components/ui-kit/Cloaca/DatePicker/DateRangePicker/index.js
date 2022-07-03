import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateRange from '../DateRange/';
import DefinedRange from '../DefinedRange';

import { withColors } from 'lib-ui/utils';
import { findNextRangeIndex } from '../utils.js';

import { DateRangePickerWrap } from './units';
import { debounce } from 'lib-root/utils';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * `DateRange` с пресетами
 *
 * import { DatePicker as DatePickerComponents } from 'core-lib-react/components';
 *
 * const { DateRangePicker, DefinedRange, TimePicker, TimePanel, DateRange, Calendar } = DatePickerComponents;
 */
class DateRangePicker extends Component {
    state = {
        focusedRange: [findNextRangeIndex(this.props.ranges), 0]
    };

    wrapRef = React.createRef();

    componentDidMount() {
        if (this.wrapRef.current) {
            this.setState(() => ({
                datePickerHeight: this.wrapRef.current.offsetHeight
            }));
        }
    }
    render() {
        const { focusedRange, datePickerHeight } = this.state;
        const { colors, className } = this.props;
        return (
            <DateRangePickerWrap
                {...{ colors, className, ref: this.wrapRef }}
                className={setClassName({ props: this.props, name: 'date-range-picker' })}>
                <DefinedRange
                    drawerHeight={datePickerHeight}
                    focusedRange={focusedRange}
                    onPreviewChange={({ range }) => {
                        return this.dateRange.updatePreview({ range });
                    }}
                    {...this.props}
                    range={this.props.ranges[focusedRange[0]]}
                    className={setClassName({ name: 'defined-ranges-picker' + (className ? `_${className}` : '') })}
                />
                <DateRange
                    onRangeFocusChange={({ range }) => this.setState({ focusedRange: range })}
                    onShownDateChange={
                        !(this.props.scroll || {}).enabled
                            ? debounce(
                                  () =>
                                      this.setState(() => ({
                                          datePickerHeight: this.wrapRef.current.offsetHeight
                                      })),
                                  100
                              )
                            : undefined
                    }
                    focusedRange={focusedRange}
                    {...this.props}
                    className={setClassName({ name: 'calendar' + (className ? `_${className}` : '') })}
                    ref={(t) => (this.dateRange = t)}
                    isDefinedRange
                />
            </DateRangePickerWrap>
        );
    }
}

DateRangePicker.displayName = 'DateRangePicker';
DateRangePicker.defaultProps = {};

DateRangePicker.propTypes = {
    /** Inherit all DateRange props */
    ...DateRange.propTypes,
    /** Inherit all DefinedRange props */
    ...DefinedRange.propTypes,
    /** ClassName to wrapper component, and it set calendar to 'calendar_{className}', defined ranges to 'defined_{className}' */
    className: PropTypes.string
};

export default withColors(DateRangePicker);
