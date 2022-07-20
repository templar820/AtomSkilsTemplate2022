import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import BaseNotificationWindow from '@components/notifications/BaseNotificationWindow';
import { MOBXDefaultProps } from '@globalTypes';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { useRootStore } from '@hooks/useRootStore';

function NotificationWindow(props: MOBXDefaultProps) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // enqueueSnackbar('Здорова отец', { variant: 'success' });
  const { AppStore } = useRootStore();
  const currentNotification = AppStore.currentNotification as unknown as BaseNotificationWindow;

  if (currentNotification && currentNotification.snacktype) {
    const key = enqueueSnackbar(currentNotification.message, {
      variant: currentNotification.snacktype,
      onClose: () => currentNotification.service.closeNotify(currentNotification),
      persist: currentNotification.persist,
      action: currentNotification.action,
      onClick: () => closeSnackbar(key),
    });

    return null;
  }

  return currentNotification?.getNotificationWindow() || null;
}

export default MobXRouterDecorator(NotificationWindow);
