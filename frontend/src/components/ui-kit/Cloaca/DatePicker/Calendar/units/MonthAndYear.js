import React, { useCallback, useState, useMemo } from 'react';
import { addYears, isSameMonth } from 'date-fns';

import { Dropdown, Item as DropdownItem } from 'lib-ui/Dropdown';

import {
    StyledMonthAndYearDivider,
    StyledMonthAndYearPickers,
    StyledMonthAndYearWrapper,
    StyledNextMonthButton,
    StyledNextMonthButtonIconLeft,
    StyledNextMonthButtonIconRight,
    StyledSelector,
    StyledSelectorValue
} from './index';
import { setClassName } from 'lib-root/utils/styleMixins';

const monthsArr = new Array(12).fill(1);

const MonthArrow = ({ dir, color, colors, maxDate, minDate, focusedDate, changeShownDate }) => {
    const Arrow = dir === 'next' ? StyledNextMonthButtonIconRight : StyledNextMonthButtonIconLeft;
    return (
        <StyledNextMonthButton
            type="button"
            disabled={isSameMonth(dir === 'next' ? maxDate : minDate, focusedDate)}
            onClick={() => changeShownDate(dir === 'next' ? 1 : -1, 'monthOffset')}
            color={colors[color] || color}
            colors={colors}>
            <Arrow icon={'Arrow_type_1'} w={'24px'} h={'24px'} />
        </StyledNextMonthButton>
    );
};

const Months = React.forwardRef(({ focusedDate, locale, monthSelector, selectChange, changeShownDate }, ref) => {
    const currentMonth = focusedDate.getMonth();
    return monthsArr.map((_, index) => {
        const month = locale.localize.month(index);
        const isSelected = currentMonth === index;
        return (
            <DropdownItem
                active={isSelected}
                scrollIntoViewOptions={true}
                isSelected={isSelected}
                key={index}
                value={index.toString()}
                onClick={(e) => {
                    monthSelector.dropdownControls.setIsOpenMain(false);
                    selectChange({
                        event: e,
                        cb: changeShownDate,
                        option: 'setMonth',
                        value: index
                    });
                }}>
                {month}
            </DropdownItem>
        );
    });
});

const Years = React.forwardRef(
    ({ focusedDate, yearSelector, maxDate, minDate, selectChange, changeShownDate }, ref) => {
        const years = useMemo(() => {
            const upperYearLimit = maxDate.getFullYear();
            const lowerYearLimit = minDate.getFullYear();
            return new Array(upperYearLimit - lowerYearLimit + 1).fill(upperYearLimit);
        }, [minDate, maxDate]);

        return years.map((val, i) => {
            const year = val - i;
            const isSelected = focusedDate.getFullYear() === year;
            return (
                <DropdownItem
                    active={isSelected}
                    isSelected={isSelected}
                    scrollIntoViewOptions={true}
                    key={year}
                    value={year.toString()}
                    onClick={(e) => {
                        yearSelector.dropdownControls.setIsOpenMain(false);
                        selectChange({
                            event: e.target.value,
                            cb: changeShownDate,
                            option: 'setYear',
                            value: year
                        });
                    }}>
                    {year}
                </DropdownItem>
            );
        });
    }
);

const DateSelectDropdown = ({ type, children, selector, clickOutsideProps, colors, focusedDate, locale }) => {
    const selectorValue = useMemo(
        () => (type === 'year' ? focusedDate.getFullYear() : locale.localize.month(focusedDate.getMonth())),
        [type, focusedDate, locale]
    );
    return (
        <Dropdown
            ref={selector}
            triggerPlacement={'bottom'}
            triggerStyle={{ display: 'block' }}
            clickOutsideProps={clickOutsideProps}
            withOutsideContainer={true}
            triggerElement={
                <StyledSelector>
                    <StyledSelectorValue {...{ colors }}>{selectorValue}</StyledSelectorValue>
                </StyledSelector>
            }
            closeOnTriggerClick={true}
            closeOnOutside={true}>
            {children}
        </Dropdown>
    );
};

const MonthAndYear = (props) => {
    const {
        focusedDate,
        changeShownDate,
        navigatorRenderer,
        showMonthArrows,
        locale,
        minDate,
        maxDate,
        showMonthAndYearPickers,
        colors,
        color,
        zIndex
    } = props;

    const [monthSelector, setMonthSelector] = useState(null);
    const [yearSelector, setYearSelector] = useState(null);
    const selectChange = useCallback(({ /*event,*/ cb, option, value }) => {
        cb(value, option);
    }, []);

    const clickOutsideProps = { style: { zIndex: zIndex + 1 } };

    const ChangeMonthArrow = useCallback(
        ({ dir }) =>
            showMonthArrows ? (
                <MonthArrow {...{ dir, color, colors, maxDate, minDate, focusedDate, changeShownDate }} />
            ) : null,
        [showMonthArrows, color, colors, maxDate, minDate, focusedDate, changeShownDate]
    );

    return navigatorRenderer ? (
        navigatorRenderer(props)
    ) : (
        <StyledMonthAndYearWrapper colors={colors} className={setClassName({ name: 'month-and-year-wrapper' })}>
            <ChangeMonthArrow dir="prev" />
            {showMonthAndYearPickers ? (
                <StyledMonthAndYearPickers>
                    <DateSelectDropdown
                        {...{
                            type: 'month',
                            selector: setMonthSelector,
                            clickOutsideProps,
                            colors,
                            focusedDate,
                            locale
                        }}>
                        <Months {...{ focusedDate, locale, monthSelector, selectChange, changeShownDate }} />
                    </DateSelectDropdown>
                    <StyledMonthAndYearDivider />
                    <DateSelectDropdown
                        {...{
                            type: 'year',
                            selector: setYearSelector,
                            clickOutsideProps,
                            colors,
                            focusedDate,
                            locale
                        }}>
                        <Years {...{ focusedDate, yearSelector, maxDate, minDate, selectChange, changeShownDate }} />
                    </DateSelectDropdown>
                </StyledMonthAndYearPickers>
            ) : (
                <StyledMonthAndYearPickers>
                    {locale.localize.month(focusedDate.getMonth())} {focusedDate.getFullYear()}
                </StyledMonthAndYearPickers>
            )}
            <ChangeMonthArrow dir="next" />
        </StyledMonthAndYearWrapper>
    );
};

MonthAndYear.defaultProps = {
    zIndex: 100,
    maxDate: addYears(new Date(), 20),
    minDate: addYears(new Date(), -100)
};

export default MonthAndYear;
