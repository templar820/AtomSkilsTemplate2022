import React from 'react';
import MuiAlert from '@mui/material';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export { Alert };
