import React from 'react';
import { autoAddPx } from 'lib-root/utils/styleMixins';
import { Transition } from 'react-transition-group';
import NotificationManager from '../NotificationManager';
import { StyledCloseAllButton, StyledNotificationPositioner, StyledTransitionGroup, StyledChild } from './units';

function NotificationPositioner(props) {
    let {
        gap,
        children,
        closeAll,
        customStylesForCloseButton,
        verticalPositon,
        direction,
        isReversed,
        notificationsLength,
        countForView,
        ...restProps
    } = props;
    gap = autoAddPx(gap);

    const notifications = React.Children.map(children, function(child) {
        return (
            <Transition in={true} timeout={500}>
                {(state) => <StyledChild {...{ gap, state }}>{child}</StyledChild>}
            </Transition>
        );
    });

    return (
        <StyledNotificationPositioner {...{ gap, direction, verticalPositon, ...restProps }}>
            {closeAll && (
                <StyledCloseAllButton
                    {...{ verticalPositon, customStylesForCloseButton, notificationsLength, countForView }}
                    onClick={() => {
                        NotificationManager.clearNotificationList();
                    }}>
                    {closeAll}
                </StyledCloseAllButton>
            )}
            <StyledTransitionGroup {...{ direction, isReversed }}>{notifications}</StyledTransitionGroup>
        </StyledNotificationPositioner>
    );
}

export default NotificationPositioner;
