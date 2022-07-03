import React, { useRef } from 'react';

import getType from 'lib-root/utils/getType';
import { setClassName } from 'lib-root/utils/styleMixins';

import List from '../List';

import { Icon, Arrow, Heading, Title, StyledLi } from 'lib-ui/SideMenu/units/ListItem/units';
import { createHandlerCreator, renameKeyProp } from './utils';
import { extractTextFromChildren } from 'lib-root/utils';

export const ListItem = ({ children, ...props }) => {
    const arrowRef = useRef();
    props = renameKeyProp(props);
    switch (getType(children)) {
        case 'object':
            props = { ...props, ...children };
            break;
        case 'function':
            return children(props);
        default:
            return null;
    }

    const {
        level,
        id,
        externalIsOpen,
        openAnimationDuration,
        closeAnimationDuration,
        isListScrolled,
        mainTransitionState,
        listTransitionState,
        edgePadding,
        iconWidth,
        isMultiActiveAllowed,
        listStyle,
        itemStyle,
        headingStyle,
        iconStyle,
        arrowStyle,
        title,
        icon,
        heading,
        arrow,
        colors,
        disabled,
        isActive,
        isOpen,
        subMenu,
        onOpenStateChange,
        onActiveStateChange,
        key,
        ...restProps
    } = props;

    const commonProps = {
        isOpen,
        externalIsOpen,
        mainTransitionState,
        disabled,
        isActive,
        colors,
        openAnimationDuration,
        closeAnimationDuration,
        edgePadding,
        iconWidth,
        isMultiActiveAllowed
    };
    const unitsProps = {
        ...commonProps,
        level,
        listTransitionState,
        isListScrolled,
        id,
        _key: key,
        hasSubMenu: !!subMenu,
        textTitle: typeof title === 'string'
    };

    const nativeTitle =
        typeof title === 'string'
            ? title
            : typeof title === 'function'
            ? extractTextFromChildren(title(props))
            : undefined;

    const createOpenStateHandler = createHandlerCreator(onOpenStateChange, isOpen, renameKeyProp(unitsProps));
    const createActiveStateHandler = createHandlerCreator(
        (key, status, event, props) => {
            const path =
                event.nativeEvent.path || (event.nativeEvent.composedPath && event.nativeEvent.composedPath()) || [];
            if (
                onActiveStateChange &&
                !path.includes(arrowRef.current) &&
                !(isActive === true && !isMultiActiveAllowed)
            )
                onActiveStateChange(key, status, event, props);
        },
        isActive,
        renameKeyProp(unitsProps)
    );

    return (
        <StyledLi
            {...{ itemStyle, ...unitsProps, ...restProps }}
            className={setClassName({ props, name: 'side-menu__item' })}>
            <Heading
                title={nativeTitle}
                className={setClassName({ name: 'side-menu__heading' })}
                {...{ heading, headingStyle, createOpenStateHandler, ...unitsProps }}
                onClick={createActiveStateHandler(restProps.onClick)}>
                <Icon
                    className={setClassName({ name: 'side-menu__icon' })}
                    {...{ icon, iconStyle, createOpenStateHandler, ...unitsProps }}
                />
                <Title {...{ title, createOpenStateHandler, ...unitsProps }} />
                <Arrow
                    ref={arrowRef}
                    className={setClassName({ name: 'side-menu__arrow' })}
                    {...{ arrow, arrowStyle, createOpenStateHandler, ...unitsProps }}
                />
            </Heading>
            <List
                level={level + 1}
                {...{
                    listStyle,
                    itemStyle,
                    headingStyle,
                    iconStyle,
                    arrowStyle,
                    onOpenStateChange,
                    onActiveStateChange,
                    ...commonProps
                }}>
                {subMenu}
            </List>
        </StyledLi>
    );
};

export default ListItem;
