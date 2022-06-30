import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import BaseNotificationWindow from '@components/notifications/BaseNotificationWindow';
import { MOBXDefaultProps } from '@globalTypes';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';

function NotificationWindow(props: MOBXDefaultProps) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // enqueueSnackbar('Здорова отец', { variant: 'success' });
  const currentNotification = props.AppStore.currentNotification as unknown as BaseNotificationWindow;

  return currentNotification?.getNotificationWindow() || null;
}

export default MobXRouterDecorator(NotificationWindow);
