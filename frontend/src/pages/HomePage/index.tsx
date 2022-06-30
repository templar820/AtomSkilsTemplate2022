import React from 'react';
import NotificationManager from '../../helpers/NotificationManager';

function HomePage(props) {
  return (
    <button onClick={() => {
      NotificationManager.EducationWindow.open({
        message: '111111',
        status: 1111
      });
    }}
    >
      Здорова отец
    </button>
  );
}

export default HomePage;
