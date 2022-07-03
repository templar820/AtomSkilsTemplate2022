import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import {
    StyledHeader,
    StyledHeaderArrow,
    StyledHeaderLeftIcon,
    StyledHeaderRightIcon,
    StyledHeaderText
} from './units';

const TimePanelHeader = ({
    focusedPicker,
    onArrowClick,
    timeValues = [],
    colors,
    dateOptions = {},
    hideArrows,
    visiblePickers,
    prevLabel,
    nextLabel,
    dateTimeFormat,
    timePanelElementChoice,
    onFocusElement,
    showArrows
}) => {
    return (
        <StyledHeader {...{ colors }}>
            {showArrows && (
                <StyledHeaderArrow
                    disabled={focusedPicker === 0}
                    {...{
                        id: 'prevArrow',
                        tabIndex: 1,
                        onFocus: () => onFocusElement({ elNum: 0 }),
                        onKeyDown: (event) =>
                            timePanelElementChoice({
                                prev: true,
                                event,
                                focusedPicker,
                                visiblePickers,
                                onArrowClick,
                                timeValues
                            }),
                        colors,
                        hideArrows,
                        onClick: () => focusedPicker > 0 && onArrowClick({ direction: 'left' })
                    }}>
                    <StyledHeaderLeftIcon icon={'Arrow_type_1'} />
                    <div>{prevLabel}</div>
                </StyledHeaderArrow>
            )}
            {new Array(visiblePickers).fill(1).map((_, index) => {
                return (
                    <React.Fragment key={index}>
                        {index > 0 && <div />}
                        <StyledHeaderText>
                            {timeValues.length &&
                                timeValues[focusedPicker + index] &&
                                format(timeValues[focusedPicker + index], dateTimeFormat, dateOptions)}
                        </StyledHeaderText>
                    </React.Fragment>
                );
            })}
            {showArrows && (
                <StyledHeaderArrow
                    disabled={focusedPicker === timeValues.length - visiblePickers}
                    {...{
                        id: 'nextArrow',
                        tabIndex: 2,
                        onFocus: () => onFocusElement({ elNum: 1 }),
                        onKeyDown: (event) =>
                            timePanelElementChoice({
                                next: true,
                                event,
                                focusedPicker,
                                visiblePickers,
                                onArrowClick,
                                timeValues
                            }),
                        colors,
                        hideArrows,
                        onClick: () =>
                            focusedPicker < timeValues.length - visiblePickers && onArrowClick({ direction: 'right' })
                    }}>
                    <div>{nextLabel}</div>
                    <StyledHeaderRightIcon icon={'Arrow_type_1'} />
                </StyledHeaderArrow>
            )}
        </StyledHeader>
    );
};

TimePanelHeader.propTypes = {
    /** Callback to click on arrows, func({ direction }) */
    onArrowClick: PropTypes.func,
    /** Index of focused value */
    focusedPicker: PropTypes.number,
    /** Number of visible value */
    visiblePickers: PropTypes.number,
    /** Array with values of time/date */
    timeValues: PropTypes.array,
    /** Colors obj */
    colors: PropTypes.object,
    /** Date-fns options */
    dateOptions: PropTypes.object,
    /** Hide arrows mode */
    hideArrows: PropTypes.bool,
    /** Label of left arrow btn */
    prevLabel: PropTypes.string,
    /** Label of right arrow btn */
    nextLabel: PropTypes.string,
    /** Format for time view in header */
    dateTimeFormat: PropTypes.string,
    /** Saves the number of the selected item */
    onFocusElement: PropTypes.func,
    /** Focusing on an item using buttons */
    timePanelElementChoice: PropTypes.func
};

TimePanelHeader.defaultProps = {
    prevLabel: 'ОТ',
    nextLabel: 'ДО',
    dateTimeFormat: 'dd.MM.yyyy | HH:mm:ss',
    onFocusElement: () => {},
    timePanelElementChoice: () => {}
};

export default TimePanelHeader;
