import React, { Component } from 'react';
import { format } from 'date-fns';

import { StyledDateDisplay, StyledDateDisplayItem, StyledDateDisplayItemInput } from './index';

class DateDisplay extends Component {
    handleRangeFocusChange(rangesIndex, rangeItemIndex) {
        this.props.onRangeFocusChange({ range: [rangesIndex, rangeItemIndex] });
    }

    formatDateDisplay(date, defaultText) {
        if (!date) return defaultText;
        return format(date, this.props.dateDisplayFormat, this.props.dateOptions);
    }

    render() {
        const { focusedRange, color, ranges, rangeColors, colors } = this.props;
        const defaultColor = colors[rangeColors[focusedRange[0]]] || colors[color] || color;
        return (
            <>
                {ranges.map((range, i) => {
                    if (range.showDateDisplay === false || (range.disabled && !range.showDateDisplay)) return null;
                    return (
                        <StyledDateDisplay key={i} style={{ color: range.color || defaultColor }}>
                            <StyledDateDisplayItem
                                colors={colors}
                                active={focusedRange[0] === i && focusedRange[1] === 0}
                                onFocus={() => this.handleRangeFocusChange(i, 0)}>
                                <StyledDateDisplayItemInput
                                    colors={colors}
                                    disabled={range.disabled}
                                    active={focusedRange[0] === i && focusedRange[1] === 0}
                                    readOnly
                                    value={this.formatDateDisplay(range.startDate, 'Не задано')}
                                />
                            </StyledDateDisplayItem>
                            <StyledDateDisplayItem
                                colors={colors}
                                active={focusedRange[0] === i && focusedRange[1] === 1}
                                onFocus={() => this.handleRangeFocusChange(i, 1)}>
                                <StyledDateDisplayItemInput
                                    colors={colors}
                                    disabled={range.disabled}
                                    active={focusedRange[0] === i && focusedRange[1] === 1}
                                    readOnly
                                    value={this.formatDateDisplay(range.endDate, 'Не задано')}
                                />
                            </StyledDateDisplayItem>
                        </StyledDateDisplay>
                    );
                })}
            </>
        );
    }
}

export default DateDisplay;
