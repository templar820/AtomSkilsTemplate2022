import * as React from 'react';

export interface InlineIconsProps {
    /** There is an opportunity to throw a custom icon https?://megawiki.megafon.ru/pages/viewpage.action?pageId=580035528 */
    icon: React.ReactNode;
    /** Defines whether component is disabled
     * isDisabled will be deprecated in future versions
     */
    disabled?: boolean;
    /** Defines width of component */
    width?: string | number;
    /** Defines height of component */
    height?: string | number;
    /** alias for width */
    w?: string | number;
    /** alias for height */
    h?: string | number;
    /** Defines color of component */
    color?: string;
    /** Defines additional className */
    className?: string;
}

declare const InlineIcons: React.ComponentType<InlineIconsProps>;

export default InlineIcons;
