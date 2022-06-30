import React, { ReactNode, useEffect } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

interface SwipeableTemporaryDrawerProps {
  children: ReactNode
  mode: 'left'| 'right'| 'top'| 'bottom',
  open:boolean
  onClose: () => void
}

export default function MyDrawer(props:SwipeableTemporaryDrawerProps) {
  const [open, setOpen] = React.useState(props.open);

  const toggleDrawer = (open) => (event) => {
    if (
      event
      && event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    if (open) {
      setOpen(true);
    } else {
      props.onClose();
    }
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <SwipeableDrawer
      anchor={props.mode}
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      {props.children}
    </SwipeableDrawer>
  );
}
