import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import Colors from '@colors';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 111111,
    backgroundColor: `${Colors.white} !important`
  },
}));

function Loader(props: MOBXDefaultProps) {
  const classes = useStyles();
  const open = props.AppStore.isLoader;
  return (
    <Backdrop className={classes.backdrop} open={open || false}>
      <CircularProgress color="primary"/>
    </Backdrop>
  );
}

export default MobXRouterDecorator(Loader, false);
