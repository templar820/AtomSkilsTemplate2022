/** @jsx jsx */
import { jsx } from '@emotion/core';
import { px } from 'lib-root/utils/units';
import React from 'react';
import InlineIcons from 'lib-ui/InlineIcons';

const NotificationIcon = React.forwardRef(
    ({ size, icon, notificationColor, isFilled, iconForFilledState, clickable, onClick }, ref) => {
        const styles = {
            marginRight: icon !== 'Cross_exit' ? px(size, 1.0667) : 0,
            marginLeft: icon === 'Cross_exit' ? 'auto' : 0,
            marginTop: icon === 'Success' ? '-2px' : '1px',
            cursor: clickable ? 'pointer' : 'default'
        };
        const iconSize =
            icon === 'Success'
                ? px(size, 1.6)
                : icon === 'Cross_exit'
                ? px(size, 0.9333333333333333)
                : px(size, 1.3333333333333333);
        return (
            <InlineIcons
                ref={ref}
                onClick={onClick}
                icon={isFilled ? iconForFilledState || icon : icon}
                color={isFilled ? 'currentColor' : notificationColor}
                style={styles}
                w={iconSize}
                h={iconSize}
            />
        );
    }
);

export default NotificationIcon;
