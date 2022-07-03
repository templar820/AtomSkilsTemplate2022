import * as React from 'react';
import { InlineIconsProps } from 'lib-ui/InlineIcons';

export interface ClocksProps extends Omit<InlineIconsProps, 'icon'> {
    /** There is an opportunity to throw a custom icon https://megawiki.megafon.ru/pages/viewpage.action?pageId=580035528 */
    icon?: React.ReactNode;
    /** Callback fires then click on Clocks */
    onClick?: () => void;
}

declare const Clocks: React.ComponentType<ClocksProps>;

export default Clocks;
