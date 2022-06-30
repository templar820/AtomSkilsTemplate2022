import React from 'react';

export default interface BaseNotificationWindow {
   getMessage(): React.ReactNode;

   getNotificationWindow(): React.ReactNode;

   getIcon(): React.ReactNode;
 };
