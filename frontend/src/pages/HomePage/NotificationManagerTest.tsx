import React from 'react';
import NotificationManager from '../../helpers/NotificationManager';
import { SnackType } from '../../model/Notifications/PageNotification';

function NotificationManagerTest(props) {
  return (
    <div className="d-flex flex-row flex-wrap justify-content-start align-items-center">
      <button onClick={() => {
        NotificationManager.Confirm.open({
          message: 'CONFIRM_WINDOW',
          title: 'CONFIRM_WINDOW',
          onClose: () => {
            console.log('CLOSE');
          },
          onSubmit: () => {
            console.log('SUBMIT');
          }
        });
      }}
      >
        Окно подтверждения
      </button>
      <button onClick={() => {
        NotificationManager.Error.open({
          message: 'ERROR_WINDOW',
          onClose: () => {
            console.log('CLOSE');
          },
        });
      }}
      >
        Окно ошибки
      </button>
      <button onClick={() => {
        NotificationManager.Alert.open({
          message: 'ALERT',
          title: 'ALERT_TITLE',
        });
      }}
      >
        Окно ALERT
      </button>
      <button onClick={() => {
        NotificationManager.Snack.open({
          message: 'Привет мир',
          snacktype: SnackType.Success,
          persist: true,
        });
      }}
      >
        Окно TOAST SUCCESS
      </button>
      <button onClick={() => {
        NotificationManager.Snack.open({
          message: 'Привет мир',
          snacktype: SnackType.Error,
          persist: true,
        });
      }}
      >
        Окно TOAST ERROR
      </button>
      <button onClick={() => {
        NotificationManager.Snack.open({
          message: 'Привет мир',
          snacktype: SnackType.Info,
          persist: true,
        });
      }}
      >
        Окно TOAST INFO
      </button>
      <button onClick={() => {
        NotificationManager.Snack.open({
          message: 'Привет мир',
          snacktype: SnackType.Warning,
          persist: true,
        });
      }}
      >
        Окно TOAST WARNING
      </button>
    </div>
  );
}

export default NotificationManagerTest;
