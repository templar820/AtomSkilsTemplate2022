import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

import withColors from 'lib-ui/utils/withColors';
import { autoAddPx } from 'lib-root/utils/styleMixins';

import NotificationIcon from './NotificationIcon';
import { getNotificationConfig } from './utils';
import { setClassName } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledNotification = styled.div`
    display: inline-flex;
    min-width: 456px;
    max-width: 688px;
    padding: ${({ isFilled }) => (isFilled ? `3px 16px` : `14px 16px 8px`)};
    border: 1px solid ${({ notificationColor }) => notificationColor};
    box-shadow: 0 0 8px rgba(51, 51, 51, 0.25);
    border-left-width: 8px;
    background-color: ${({ colors, isFilled, notificationColor }) =>
        isFilled ? notificationColor : colors.GrayScale_0};
    color: ${({ colors, isFilled }) => (isFilled ? colors.GrayScale_0 : 'currentColor')};
    font-size: ${({ size }) => autoAddPx(size)};
    line-height: 1.6;
    pointer-events: auto;
    ${({ css, ...restProps }) => applyEmotionStyle(css, restProps)};
`;

/**
 * Компонент всплывающего окна/уведомления.
 *
 * import { Notification as NotificationComponents } from 'core-lib-react/components';
 *
 * const { Notification, NotificationContainer, NotificationManager } = NotificationComponents;
 */
const Notification = React.forwardRef(({ colors, size, ...restProps }, ref) => {
    const { className, children, onClick, onClose, ...restNotificationConfig } = getNotificationConfig(
        restProps,
        colors
    );
    const closeRef = useRef();
    return (
        <StyledNotification
            onClick={(e) => {
                if (e.target !== closeRef.current && !closeRef.current.contains(e.target)) {
                    onClick && onClick(e);
                }
            }}
            {...{ ref, colors, size, ...restNotificationConfig }}
            className={setClassName({ props: { className }, name: 'notification' })}>
            <NotificationIcon {...{ size, ...restNotificationConfig }} />
            {children}
            <NotificationIcon
                {...{
                    size,
                    ...restNotificationConfig,
                    clickable: true,
                    ref: closeRef,
                    onClick: (e) => onClose && onClose(e),
                    icon: 'Cross_exit',
                    iconForFilledState: 'Cross_exit'
                }}
            />
        </StyledNotification>
    );
});

Notification.displayName = 'Notification';
Notification.propTypes = {
    /** Defines preset of component */
    preset: PropTypes.oneOf(['success', 'attention', 'error', 'custom']),
    /** Defines color of component */
    notificationColor: PropTypes.string,
    /** Defines icon of component */
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    /** Defines text or any node that will be placed in a body of the component */
    children: PropTypes.node,
    /** Defines whether component should be filled */
    isFilled: PropTypes.bool,
    /** Callback that will be fired on clicking notification's body */
    onClick: PropTypes.func,
    /** Callback that will be fired on clicking notification's close icon */
    onClose: PropTypes.func,
    /** Defines font-size */
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines additional className */
    className: PropTypes.string,
    /** Defines additional component css */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** time to live in the hidden state (ms) */
    ttl: PropTypes.number
};
Notification.defaultProps = {
    preset: 'attention',
    size: '15px',
    isFilled: true
};

export default withColors(Notification);
