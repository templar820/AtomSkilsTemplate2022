import React, { useReducer, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

import Portal from 'lib-ui/utils/Portal/Portal';

import { setClassName } from 'lib-root/utils/styleMixins';
import { canUseDOM } from 'lib-root/utils';
import { LayersContext } from 'lib-root/layers';

import Notification from '../Notification';
import NotificationManager from '../NotificationManager';
import NotificationPositioner from './NotificationPositioner';
import { StyledNotificationContainer } from './units';

const notificationsReducer = (_, payload) => [...payload];

const NotificationContainer = React.forwardRef(
    ({ className, css: _css, horizontalPosition, x, verticalPosition, y, ...restProps }, ref) => {
        const [notifications, dispatchNotifications] = useReducer(notificationsReducer, []);

        useEffect(() => {
            NotificationManager.addChangeListener(dispatchNotifications);
            return () => {
                NotificationManager.removeChangeListener(dispatchNotifications);
            };
        });

        const renderedNotifications = notifications.map(({ id, onClick, onClose, ...restNotificationProps }) => (
            <Notification
                key={id}
                {...restNotificationProps}
                onClose={(e) => {
                    let preventClosing;
                    if (typeof onClose === 'function') preventClosing = onClose(e);
                    if (!preventClosing) NotificationManager.removeNotificationById(id);
                }}
                onClick={(e) => {
                    if (onClick) onClick(e, () => NotificationManager.removeNotificationById(id));
                }}
            />
        ));

        return (
            <Portal node={document.body} roleName={'notification'} hasLayerControl={false}>
                <LayersContext.Consumer>
                    {(zIndex) => (
                        <StyledNotificationContainer
                            {...{ ref, _css, zIndex }}
                            className={setClassName({ props: { className }, name: 'notification__container' })}>
                            <Transition in={!!notifications.length && canUseDOM} timeout={500}>
                                {(state) => (
                                    <NotificationPositioner
                                        horizontalPosition={x || horizontalPosition}
                                        verticalPosition={y || verticalPosition}
                                        notificationsLength={notifications.length}
                                        {...{ state, ...restProps }}>
                                        {renderedNotifications}
                                    </NotificationPositioner>
                                )}
                            </Transition>
                        </StyledNotificationContainer>
                    )}
                </LayersContext.Consumer>
            </Portal>
        );
    }
);

NotificationContainer.displayName = 'NotificationContainer';
NotificationContainer.propTypes = {
    /** Defines horizontal position */
    horizontalPosition: PropTypes.oneOf(['left', 'right']),
    /** Defines vertical position */
    verticalPosition: PropTypes.oneOf(['top', 'bottom']),
    /** alias for horizontalPosition */
    x: PropTypes.oneOf(['left', 'right']),
    /** alias for verticalPosition */
    y: PropTypes.oneOf(['top', 'bottom']),
    /** Defines direction of component */
    direction: PropTypes.oneOf(['column', 'row']),
    /** Defines whether component should be reversed */
    isReversed: PropTypes.bool,
    /** Defines padding of component */
    gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines additional className */
    className: PropTypes.string,
    /** Defines additional component css */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines additional emotion styles for close icon */
    customStylesForCloseButton: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    /** Defines whether closeAll should be shown */
    closeAll: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.node, PropTypes.string]),
    /** Defines number of notifications needed for closeAll to be shown */
    countForView: PropTypes.number
};
NotificationContainer.defaultProps = {
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    direction: 'column',
    isReversed: true,
    gap: '12',
    closeAll: 'Закрыть все оповещения',
    countForView: 1
};

export default NotificationContainer;
