import * as React from 'react';
import { ColorsType, CustomRenderType, EmotionStylesType, TransitionStateType } from 'lib-ui';
import { InlineIconsProps } from 'lib-ui/InlineIcons';

declare type EmotionIconStylesType = EmotionStylesType<Omit<IconProps, 'iconStyle'>>;
declare type EmotionHeadingStylesType = EmotionStylesType<Omit<HeadingProps, 'headingStyle'>>;
declare type EmotionArrowStylesType = EmotionStylesType<Omit<ArrowProps, 'arrowStyle'>>;

declare type EmotionWrapperStylesType = EmotionStylesType<{
    /** defines gap between menu borders and the content. Also affect some of the others connected measures */
    edgePadding?: number;
    /** defines icons' sizes and connected paddings in the menu */
    iconWidth?: number;
    /** internally passing colors object received from the Context */
    colors?: ColorsType;
    /** time needed for the menu (or list) to open (in ms)*/
    openAnimationDuration?: number;
    /** time needed for the menu (or list) to close (in ms) */
    closeAnimationDuration?: number;
    /** width of the menu while open. If auto will take all needed place without overflow */
    openWidth?: 'auto' | number | string;
    /** indicates transition state of the whole menu */
    state?: TransitionStateType;
    /** defines whether the menu is open */
    isOpen?: boolean;
    /** classNames that will be added to the wrapper classes list */
    className?: string;
    /** usually first-level list in menu */
    children?: React.ReactNode;
    /** allow to gain an access to the wrapper DOM element */
    wrapperRef?: React.RefObject<Element>;
}>;

declare interface CommonProps {
    /** defines gap between menu borders and the content. Also affect some of the others connected measures */
    edgePadding?: number;
    /** defines icons' sizes and connected paddings in the menu */
    iconWidth?: number;
    /** false if there is at list one closed list (or whole menu) at the tree hierarchy */
    externalIsOpen?: boolean;
    /** current level at the tree hierarchy. Starts with 0 */
    level?: number;
    /** time needed for the menu (or list) to open (in ms) */
    openAnimationDuration?: number;
    /** time needed for the menu (or list) to close (in ms) */
    closeAnimationDuration?: number;
    /** indicates transition state of the whole menu */
    mainTransitionState?: TransitionStateType;
    /** emotions styles for list items. This value is inheritable, but could be overridden further */
    itemStyle?: EmotionStylesType<CommonItemUnitProps>;
    /** emotions styles for heading container . This value is inheritable, but could be overridden further */
    headingStyle?: EmotionHeadingStylesType;
    /** emotion styles for the icon. This value is inheritable, but could be overridden further */
    iconStyle?: EmotionIconStylesType;
    /** emotion styles for the arrow icon. This value is inheritable, but could be overridden further */
    arrowStyle?: EmotionArrowStylesType;
    /** internally passing colors object received from the Context */
    colors?: ColorsType;
    /** defines whether this element is disabled. This value is inheritable, but could be overridden further */
    disabled?: boolean;
    /** defines whether this item (or parenting if it's not an item) is marked as active */
    isActive?: boolean;
    /** defines whether this item's list (or parenting if it's not an item) is open */
    isOpen?: boolean;
    /** callback that will be fired if menu or one of the lists opens or closes.
     * Closing by outside event will use native event instead of synthetic */
    onOpenStateChange?: ItemStateChangeCallback<React.UIEvent | MouseEvent>;
    /** callback that will be fired if user click on heading to make it active */
    onActiveStateChange?: ItemStateChangeCallback;
    /** if set true, user could mark several items as active */
    isMultiActiveAllowed?: boolean;
    [prop: string]: any;
}

declare interface CommonItemUnitProps
    extends Omit<
        CommonProps,
        'itemStyle' | 'headingStyle' | 'iconStyle' | 'arrowStyle' | 'onOpenStateChange' | 'onActiveStateChange'
    > {
    /** indicate the state of the parent list transition */
    listTransitionState?: TransitionStateType;
    /** indicate whether parent list has been scrolled */
    isListScrolled?: boolean;
    /** indicate whether it's parent item has a subMenu*/
    hasSubMenu?: boolean;
    /** classname that will be added to the class list */
    className?: string;
    /** react key. Also will be user for open and active changes callback. Generic id will be used if undefined */
    key?: string;
    /** generic id of the item (or parenting item) describes by indexes hierarchy. Like 1-2-0 */
    id?: string;
    /** factory for blending onClick with onOpenStateChange callback. Result func will be passed as onClick */
    createOpenStateHandler?: (onClick?: (event: React.UIEvent) => void) => (event: React.UIEvent) => void;
}

declare type IconProps = CommonItemUnitProps & {
    /** emotions styles for icon */
    iconStyle?: EmotionIconStylesType;
    /** name of the icon to be rendered */
    icon?: string;
    /** icon color */
    color?: string;
    /** icon width (normally the same as height) */
    width?: number;
    /** icon height (normally the same as width)  */
    height?: number;
};

declare type ArrowProps = CommonItemUnitProps & {
    /** emotions styles for arrow icon */
    arrowStyle?: EmotionArrowStylesType;
    /** name of the icon to be rendered instead of arrow icon */
    icon?: string;
    /** arrow color */
    color?: string;
    /** arrow icon width (normally the same as height) */
    width?: number;
    /** arrow icon height (normally the same as width)  */
    height?: number;
};

declare type HeadingProps = CommonItemUnitProps & {
    /** emotions styles for heading container */
    headingStyle?: EmotionHeadingStylesType;
    /** icon, title and arrow nodes */
    children?: React.ReactNode;
};

declare type ItemStateChangeCallback<T = React.UIEvent> = (
    key: string,
    newState: boolean,
    event: T,
    props?: CommonItemUnitProps
) => void;

declare interface SideMenuItemProps extends CommonProps {
    /** overrides props that indicate parent scrolled status received internally (caution: may broke animation) */
    isListScrolled?: boolean;
    /** overrides transition state received internally (caution: may broke animation) */
    listTransitionState?: TransitionStateType;
    /** react key. Also will be user for open and active changes callback. Generic id will be used if undefined */
    key?: string;
    /** defines heading text. Could be element or render function */
    title?: CustomRenderType<
        Omit<CommonItemUnitProps, 'className' | 'children'> & { title?: CustomRenderType<CommonItemUnitProps> }
    >;
    /** defines icon by name (str) or customizes it as props (obj) or overrides it (func ans element)
     * If undefined, renders dot icon. If null, will remove icon from heading*/
    icon?: string | CustomRenderType<IconProps & { icon?: CustomRenderType<IconProps> }> | InlineIconsProps;
    /** overrides item's heading with custom one. Or could be props object to customize the heading */
    heading?: CustomRenderType<HeadingProps & { heading?: CustomRenderType<HeadingProps> | object }>;
    /** defines arrow by name (str) or customizes it as props (obj) or overrides it (func and element)
     * If undefined, renders standard arrow icon. If null, will remove arrow from heading*/
    arrow?: string | CustomRenderType<ArrowProps & { arrow?: CustomRenderType<ArrowProps> }> | InlineIconsProps;
    /** tree-like elements of the menu */
    subMenu?: SideMenuItems;
}

declare type SideMenuItem = SideMenuItemProps | CustomRenderType<SideMenuItemProps>;

declare type SideMenuItems<T extends object = SideMenuListProps> =
    | Array<SideMenuItem>
    | SideMenuListPropsOfItemsObject
    | CustomRenderType<T>;

declare interface SideMenuListProps extends CommonProps {
    /** tree-like elements of the menu or its override */
    items?: SideMenuItems;
    /** callback will be fired immediately on ul scroll */
    onScroll?: (event: React.UIEvent) => void;
}

declare interface SideMenuListPropsOfItemsObject extends SideMenuListProps {
    /** tree-like elements of the menu */
    items?: Array<SideMenuItem>;
}
export interface SideMenuProps
    extends Omit<
        CommonProps,
        | 'colors'
        | 'externalIsOpen'
        | 'isActive'
        | 'level'
        | 'id'
        | 'openAnimationDuration'
        | 'closeAnimationDuration'
        | 'mainTransitionState'
    > {
    /** tree-like elements of the menu */
    items?: SideMenuItems<Omit<SideMenuListProps, 'onScroll' | 'isActive'>>;
    /** defines time needed for the menu to open or close (in ms) */
    animationDurations?: number | { open?: number; close: number };
    /** width of the menu while open. If auto will take all needed place without overflow */
    openWidth?: 'auto' | number | string;
    /** emotions styles for list of items. This value is inheritable, but could be overridden further */
    listStyle?: EmotionStylesType;
    /** emotion styles for root element */
    wrapperStyle?: EmotionWrapperStylesType;
    /** will be added to the root element's class list */
    className?: string;
    /** set true if menu should opens on mouseEnter */
    openOnMouseEnter?: boolean;
    /** set true if menu should closes on mouseLeave */
    closeOnMouseLeave?: boolean;
    /** set true if menu should closes on clickOutside of it */
    closeOnOutsideClick?: boolean;
    /** if set false, active status will be tracked by Menu itself, isActive fields in items - default values */
    isActiveStateControlled?: boolean;
    /** if set false, open status will be tracked by Menu itself, isOpen fields in items - default values */
    isOpenStateControlled?: boolean;
    /** will override or customize closeItem */
    closeItem?: SideMenuItem;
}

export const SideMenu: React.ComponentType<SideMenuProps>;

export default SideMenu;
