import React, { useState, useCallback, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import { withColors } from 'lib-ui/utils';

import TimeItem from '../TimeItem';

import { ListWrapper } from './units';
import smoothscroll from 'smoothscroll-polyfill';

const TimeList = ({
    wrapperStyle,
    listWrapperStyles,
    maxNumberOfVisibleOptions,
    colors,
    items,
    id,
    activeItem,
    onItemClick,
    disabledItems = [],
    hideDisabledOptions,
    tabIndex,
    timePanelKeyControl,
    onFocus,
    elNum,
    ...rest
}) => {
    const listRef = React.createRef();
    const [currentItemElm, setCurrentItemElm] = useState(undefined);
    const [behavior, setBehavior] = useState('auto');
    const getActiveItemElm = useCallback(
        (elm) => {
            setCurrentItemElm(elm);
        },
        [activeItem]
    );

    const checkDisable = useCallback(
        (item) => {
            return disabledItems && disabledItems.indexOf(item) >= 0;
        },
        [disabledItems]
    );

    smoothscroll.polyfill();

    useLayoutEffect(() => {
        if (currentItemElm) {
            listRef.current &&
                listRef.current.scrollTo({
                    top: currentItemElm.clientHeight * activeItem,
                    behavior
                });
            if (behavior === 'auto') {
                setBehavior('smooth');
            }
        }
    }, [currentItemElm, activeItem]);

    return (
        <ListWrapper
            {...{
                colors,
                onFocus,
                onKeyDown: (event) => timePanelKeyControl({ event, activeItem, onItemClick }),
                tabIndex,
                id,
                listWrapperStyles,
                maxNumberOfVisibleOptions
            }}
            ref={listRef}>
            {items.map((item, index) => {
                const isActive = item === activeItem;
                const disabled = checkDisable(item);

                if (disabled && hideDisabledOptions) return null;

                return (
                    <TimeItem
                        {...{
                            key: index,
                            item,
                            isActive,
                            disabled,
                            ref: isActive ? getActiveItemElm : undefined,
                            onClick: onItemClick
                        }}
                        {...rest}
                    />
                );
            })}
        </ListWrapper>
    );
};

TimeList.displayName = 'TimeList';
TimeList.propTypes = {
    /** Emotion styles applied to the wrapper of component. Overrides default. */
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles applied to the list wrapper of component. Overrides default. */
    listWrapperStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines height of TimePicker */
    maxNumberOfVisibleOptions: PropTypes.number,
    /** Array with disabled items */
    disabledItems: PropTypes.array,
    /** Defines whether show disabled items or not */
    hideDisabledOptions: PropTypes.bool,
    /** All time values in list */
    items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    /** Current active item of time */
    activeItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Callback fired then user click on one of item in list, to set it active , func({ newValue })*/
    onItemClick: PropTypes.func,
    /** Extract the listener key from the rest */
    onFocus: PropTypes.func,
    /** Controlling a component using buttons */
    timePanelKeyControl: PropTypes.func
};
TimeList.defaultProps = {
    maxNumberOfVisibleOptions: 6
};

export default withColors(TimeList);
