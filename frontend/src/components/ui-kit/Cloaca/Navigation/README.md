#### Component (Navigation)

Set of three components for building navigation: Navigation, NavigationWithPreset, (Navigation)Item.

Navigation is a base component that visualize menu items, logos and all the stuff.

Item - menu item corresponds to menu link. Could be rendered in left or right item group (see below). Left items also
goes to dropdown in mobile mode.

NavigationWithPreset - Navigation wrapped in component receiving preset name and setting new default props for
Navigation. Could be extended and overwritten with any other prop of Navigation.

##### Navigation Properties

-   children: (string) - There must be Navigation Items
-   height: (string || number) - Defines the height of the component. Default - '100px'
-   horizontalPadding: (string || number) - Defines padding from left and right edges. Default - '50px'
-   logoColor: (string) - Defines color of the logo (not extraLogo). Default - colors.primary
-   colorRight: (string) - Defines color of the items in right item group. Default - colors.primary
-   colorLeft: (string) - Defines color of the items in left item group. Default - colors.secondary
-   onLogoClick: (func) - Defines callback on click on logo
-   mobile: (bool) - Force setting mobile mode
-   logoFontSize: (number) - Defines size of the MegaFon logo (not extraLogo) set in px. Default - 8
-   showIcons: (bool) - Defines whether menu items in desktop version should be shown with icons. Default - true
-   extraLogo: (node) - Defines extra logo which could be set right to the MegaFon logo
-   css: (object) - Emotion styles applied to the top level wrapper of the component
-   extraLogoWrapperStyles: (object) - Emotion styles applied to extraLogo if exist

##### NavigationWithPreset Properties

-   preset: ('narrow' || 'normal') - Defines what set of props will be chosen from presets. Default - 'narrow'
-   ... other props identical to the Navigation component. They will extend and override preset's props if in conflict

##### (Navigation) Item Properties

-   children: (node) - Usually is a title of menu item
-   icon: (node) - Node with InlineIcon. But it is possible to set any node
-   active: (bool) - Defines whether the item should be highlighted. Default - false
-   color: (string) - Defines highlighting color (used if item marked as active). By default inherit the value from Navigation
-   position: ('left' || 'right') - Defines in which group of items the item will be placed. Default - 'left'
-   showIcons: (bool) - Defines whether the icon should be visible. By default inherit the value from Navigation
-   onClick: (func) - The function that will be fired on click
-   css: (object) - Emotion styles for the top level wrapper of the item
