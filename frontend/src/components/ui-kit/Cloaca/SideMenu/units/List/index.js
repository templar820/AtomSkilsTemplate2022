import React, { useReducer, useRef } from 'react';

import { Transition } from 'react-transition-group';

import getType from 'lib-root/utils/getType';
import { setClassName } from 'lib-root/utils/styleMixins';

import { ListItem } from '../ListItem';

import { EffectTrigger, StyledUl } from './units';

export const List = ({ children, ...props }) => {
    const ulRef = useRef();
    const [isScrolled, checkScroll] = useReducer(() => (!ulRef.current ? false : !!ulRef.current['scrollTop']), false);

    // line below is needed for hidden height calculating in animation
    const _isOpen = props.isOpen === true && (props.externalIsOpen === true || props.level !== 1);

    return (
        <Transition in={_isOpen} timeout={_isOpen ? props.openAnimationDuration : props.closeAnimationDuration}>
            {(state) => {
                switch (getType(children)) {
                    case 'object':
                        props = { ...props, ...children };
                        break;
                    case 'array':
                        props = { ...props, items: children };
                        break;
                    case 'function':
                        return children({ state, ...props });
                    default:
                        return children || null;
                }

                const {
                    items,
                    listStyle,
                    itemStyle,
                    headingStyle,
                    iconStyle,
                    arrowStyle,
                    colors,
                    externalIsOpen,
                    disabled,
                    isActive,
                    isOpen,
                    level,
                    openAnimationDuration,
                    closeAnimationDuration,
                    openWidth,
                    mainTransitionState,
                    edgePadding,
                    iconWidth,
                    isMultiActiveAllowed,
                    onScroll,
                    onOpenStateChange,
                    onActiveStateChange
                } = props;

                const commonProps = {
                    disabled,
                    level,
                    openAnimationDuration,
                    closeAnimationDuration,
                    edgePadding,
                    iconWidth,
                    isMultiActiveAllowed,
                    colors,
                    listStyle
                };

                return (
                    <EffectTrigger state={state} effect={checkScroll}>
                        <StyledUl
                            onScroll={(...args) => {
                                checkScroll();
                                typeof onScroll === 'function' && onScroll(...args);
                            }}
                            ref={ulRef}
                            isOpen={_isOpen}
                            {...{ isActive, openWidth, ulRef, state, ...commonProps }}
                            className={setClassName({ props, name: 'side-menu__list' })}>
                            {items.map((item) => {
                                return (
                                    <ListItem
                                        mainTransitionState={mainTransitionState}
                                        listTransitionState={state}
                                        isListScrolled={isScrolled}
                                        externalIsOpen={isOpen && externalIsOpen}
                                        key={item.key}
                                        _key={item.key}
                                        {...{
                                            itemStyle,
                                            headingStyle,
                                            iconStyle,
                                            arrowStyle,
                                            onOpenStateChange,
                                            onActiveStateChange,
                                            ...commonProps
                                        }}>
                                        {item}
                                    </ListItem>
                                );
                            })}
                        </StyledUl>
                    </EffectTrigger>
                );
            }}
        </Transition>
    );
};

export default List;
