import React from 'react';
import NotificationManagerTest from '@pages/HomePage/NotificationManagerTest';
import NotificationManager from '../../helpers/NotificationManager';
import { SnackType } from '../../model/Notifications/PageNotification';

function HomePage(props) {
  return (
    <div className="d-flex flex-column flex-wrap">
      <NotificationManagerTest />
    </div>

  );
}

export default HomePage;
