import React, { useContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { ColorsContext } from 'lib-root/colors';

import Drawer from 'lib-ui/Drawer';
import { curtainStyle, StyledMenuWrapper } from './units';
import Content from './Content';
import { setClassName } from 'lib-root/utils/styleMixins';
import { createDepreactionWarning } from 'lib-root/utils';

const deprecationWarning = createDepreactionWarning(
    'DEPRECATION WARNING\n`Menu` is deprecated and will be removed from package in one of future major versions.\nPlease, consider using `SideMenu` component instead of it.'
);
/**
 * Выпадающее меню. "Под капотом" использует компонент `Drawer`.
 */
const Menu = React.forwardRef(
    (
        {
            className,
            isControlled,
            withCheckbox,
            items,
            isOpen: isOpenProp,
            animationDuration,
            treeAnimationDuration,
            onClickItem,
            activeItem: initialActiveItem,
            size,
            position,
            ...restProps
        },
        ref
    ) => {
        const colors = useContext(ColorsContext);
        const [isOpen, setIsOpen] = useState(isOpenProp);
        const [activeItem, setActiveItem] = useState(initialActiveItem || null);
        const onClickOutside = useCallback((event) => isOpen && setIsOpen(false), [isOpen]);
        const onClickHamburger = useCallback(() => setIsOpen((isOpen) => !isOpen), []);
        deprecationWarning();
        return (
            <StyledMenuWrapper>
                <Drawer
                    {...{
                        className: setClassName({ props: { className }, name: 'menu' }),
                        ref,
                        isOpen,
                        animationDuration,
                        size,
                        position,
                        onClickOutside,
                        curtainStyle: curtainStyle(colors, size, withCheckbox),
                        colors,
                        ...restProps
                    }}>
                    <Content
                        {...{
                            isControlled,
                            withCheckbox,
                            items,
                            isOpen,
                            activeItem,
                            onClickItem,
                            onClickHamburger,
                            setActiveItem,
                            treeAnimationDuration,
                            colors,
                            ...restProps
                        }}
                    />
                </Drawer>
            </StyledMenuWrapper>
        );
    }
);

Menu.displayName = 'Menu';
Menu.propTypes = {
    /** For full control by click on item */
    isControlled: PropTypes.bool,
    /** Active item in format '0-0-0', where number represents active index on corresponding menu level */
    activeItem: PropTypes.string,
    /** Toggle checkable mode */
    withCheckbox: PropTypes.bool,
    /** Menu items */
    items: PropTypes.array.isRequired,
    /** Opening state */
    isOpen: PropTypes.bool,
    /** Callback on item clicking(checking). Receives position key */
    onClickItem: PropTypes.func,
    /** Duration of opening/closing drawer animation */
    animationDuration: PropTypes.number,
    /** Duration of opening/closing tree animation */
    treeAnimationDuration: PropTypes.number,
    /** Menu width */
    size: PropTypes.string,
    /** Unique field of item for key. By default key = position on tree ("0-1", "1-2-2" for example) */
    keyField: PropTypes.string,
    /** Curtain position */
    position: PropTypes.oneOf(['right', 'left'])
};

Menu.defaultProps = {
    isControlled: false,
    withCheckbox: false,
    items: [],
    isOpen: false,
    animationDuration: 500,
    treeAnimationDuration: 175,
    size: '100%',
    position: 'left'
};

export default Menu;
