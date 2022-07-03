import * as React from 'react';

export interface MenuProps {
    /** For full control by click on item */
    isControlled?: boolean;
    /** Active item in format '0-0-0', where number represents active index on corresponding menu level */
    activeItem?: string;
    /** Toggle checkable mode */
    withCheckbox?: boolean;
    /** Menu items */
    items: Array<object>;
    /** Opening state */
    isOpen?: boolean;
    /** Callback on item clicking(checking). Receives position key */
    onClickItem?: (key: string) => void;
    /** Duration of opening/closing drawer animation */
    animationDuration?: number;
    /** Duration of opening/closing tree animation */
    treeAnimationDuration?: number;
    /** Menu width */
    size?: string;
    /** Unique field of item for key. By default key = position on tree ("0-1", "1-2-2" for example) */
    keyField?: string;
    /** Curtain position */
    position?: 'right' | 'left';
}

declare const Menu: React.ComponentType<MenuProps>;

export default Menu;
