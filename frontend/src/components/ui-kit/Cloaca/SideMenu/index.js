import React, { useContext, useImperativeHandle, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { Transition } from 'react-transition-group';
import { useOutsideEvent } from 'react-on-outside-event';

import { ColorsContext } from 'lib-root/colors';
import { setClassName } from 'lib-root/utils/styleMixins';

import {
    splitAnimationDurations,
    createOpenStateHandler,
    customizeCloseItem,
    useStoreController,
    buildMenuTree
} from './utils';

import { List, Wrapper } from './units';

const SideMenu = React.forwardRef(
    (
        {
            items = [],
            isOpen: _isOpen,
            animationDurations,
            openWidth,
            edgePadding,
            disabled,
            iconWidth,
            listStyle,
            itemStyle,
            headingStyle,
            iconStyle,
            arrowStyle,
            closeItem: _closeItem,
            onClick: _onClick,
            onMouseEnter: _onMouseEnter,
            onMouseLeave: _onMouseLeave,
            onOpenStateChange: _onOpenStateChange,
            onActiveStateChange: _onActiveStateChange,
            isActiveStateControlled,
            isOpenStateControlled,
            isMultiActiveAllowed,
            openOnMouseEnter,
            closeOnMouseLeave,
            closeOnOutsideClick,
            ...restProps
        },
        forwardedRef
    ) => {
        const colors = useContext(ColorsContext);
        const wrapperRef = useRef();
        const keysRef = useRef([]);

        useImperativeHandle(forwardedRef, () => ({
            ref: wrapperRef
        }));

        const [activeStore, onActiveStateChange] = useStoreController(
            isActiveStateControlled,
            _onActiveStateChange,
            keysRef,
            isMultiActiveAllowed
        );
        const [openStore, onOpenStateChange] = useStoreController(isOpenStateControlled, _onOpenStateChange, keysRef);

        const isOpen = openStore.menu !== undefined ? openStore.menu : _isOpen;

        const { openAnimationDuration, closeAnimationDuration } = splitAnimationDurations(animationDurations);

        const commonProps = {
            colors,
            openAnimationDuration,
            closeAnimationDuration,
            edgePadding,
            iconWidth,
            openWidth,
            isMultiActiveAllowed
        };

        const closeItem = customizeCloseItem(isOpen, _closeItem);
        const [preparedList, keys] = useMemo(() => buildMenuTree(items, activeStore, openStore), [
            items,
            activeStore,
            openStore
        ]);
        keysRef.current = keys;

        const outsideClickHandler = useOutsideEvent(
            createOpenStateHandler(closeOnOutsideClick, isOpen, false, onOpenStateChange)
        );
        const onClick = _onClick ? outsideClickHandler(_onClick) : outsideClickHandler;
        const onMouseEnter = createOpenStateHandler(openOnMouseEnter, isOpen, true, onOpenStateChange, _onMouseEnter);
        const onMouseLeave = createOpenStateHandler(closeOnMouseLeave, isOpen, false, onOpenStateChange, _onMouseLeave);

        return (
            <Transition in={isOpen} timeout={isOpen ? openAnimationDuration : closeAnimationDuration}>
                {(state) => (
                    <Wrapper
                        ref={wrapperRef}
                        {...{ onClick, onMouseEnter, onMouseLeave, onMouseOver: onMouseEnter }}
                        {...{ ...commonProps, wrapperRef, state, isOpen, ...restProps }}
                        className={setClassName({ props: restProps, name: 'side-menu' })}>
                        <List
                            level={0}
                            isOpen={true}
                            externalIsOpen={isOpen}
                            mainTransitionState={state}
                            {...{
                                listStyle,
                                itemStyle,
                                headingStyle,
                                iconStyle,
                                arrowStyle,
                                disabled,
                                onOpenStateChange,
                                onActiveStateChange,
                                ...commonProps
                            }}>
                            {Array.isArray(preparedList) && closeItem ? [closeItem, ...preparedList] : preparedList}
                        </List>
                    </Wrapper>
                )}
            </Transition>
        );
    }
);

SideMenu.displayName = 'SideMenu';
SideMenu.propTypes = {
    /** tree-like elements of the menu */
    items: PropTypes.array,
    /** defines whether the menu is open */
    isOpen: PropTypes.bool,
    /** defines time needed for the menu to open or close (in ms) */
    animationDurations: PropTypes.oneOfType([
        PropTypes.shape({ open: PropTypes.number, close: PropTypes.number }),
        PropTypes.number
    ]),
    /** defines gap between menu borders and the content. Also affect some of the others connected measures */
    edgePadding: PropTypes.number,
    /** defines icons' sizes and connected paddings in the menu */
    iconWidth: PropTypes.number,
    /** width of the menu while open. If auto will take all needed place without overflow */
    openWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.oneOf(['auto'])]),
    /** emotion styles for root element */
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** emotions styles for list items. This value is inheritable, but could be overridden further */
    itemStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** emotions styles for list of items. This value is inheritable, but could be overridden further */
    listStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** emotions styles for heading container . This value is inheritable, but could be overridden further */
    headingStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** emotion styles for the icon. This value is inheritable, but could be overridden further */
    iconStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** emotion styles for the arrow icon. This value is inheritable, but could be overridden further */
    arrowStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** defines whether the menu is disabled. This value is inheritable, but could be overridden further */
    disabled: PropTypes.bool,
    /** will be added to the root element's class list */
    className: PropTypes.string,
    /** callback that will be fired if menu or one of the lists opens or closes */
    onOpenStateChange: PropTypes.func,
    /** callback that will be fired if user click on heading to make it active */
    onActiveStateChange: PropTypes.func,
    /** set true if menu should opens on mouseEnter */
    openOnMouseEnter: PropTypes.bool,
    /** set true if menu should closes on mouseLeave */
    closeOnMouseLeave: PropTypes.bool,
    /** set true if menu should closes on clickOutside of it */
    closeOnOutsideClick: PropTypes.bool,
    /** if set false, active status will be tracked by Menu itself, isActive fields in items - default values */
    isActiveStateControlled: PropTypes.bool,
    /** if set false, open status will be tracked by Menu itself, isOpen fields in items - default values */
    isOpenStateControlled: PropTypes.bool,
    /** if set true, user could mark several items as active */
    isMultiActiveAllowed: PropTypes.bool,
    /** will override or customize closeItem */
    closeItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func, PropTypes.node])
};
SideMenu.defaultProps = {
    openWidth: '320px',
    edgePadding: 28,
    iconWidth: 20,
    animationDurations: 300,
    openOnMouseEnter: false,
    closeOnMouseLeave: false,
    closeOnOutsideClick: true,
    isActiveStateControlled: true,
    isOpenStateControlled: true
};

export { SideMenu };
export default SideMenu;
