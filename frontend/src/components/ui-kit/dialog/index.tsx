import React, { useState, useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  IconButton,
  CloseIcon,
} from 'ui-kit';

import { makeStyles } from '@mui/styles';

import IProps from './Dialog.types';

import './style.scss';

const useStyles = makeStyles({
  root: {
    width: (props: IProps) => props.width || 'auto',
    height: (props: IProps) => props.height || 'auto',
  },
});

function CommonDialog({
  className,
  contentClassName,
  isOpen,
  open: openState,
  onChange,
  ...rest
}: IProps) {
  const [open, setOpen] = useState(isOpen);
  const classes = useStyles(rest);

  const classNameProps = {
    get init() {
      let value = 'CommonDialog';

      if (rest.cfg.icon) value += ' with-icon';
      if (className) value += ` ${className}`;

      return value;
    },
  };

  const handleClose = () => {
    setOpen(false);

    onChange(false);
  };

  const handleSubmit = (event) => {
    if (rest.onSubmit) {
      rest.onSubmit(event);
    }
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Dialog
      classes={{
        paper: classes.root,
      }}
      className={`${classNameProps.init} ${className}`}
      maxWidth="lg"
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...rest}
    >
      <DialogTitle
        id={rest.dialogTitleProps ? rest.dialogTitleProps : 'alert-dialog-title'}
        disableTypography
      >
        {rest.cfg.icon && <div className="dialog-icon">{rest.cfg.icon}</div>}

        <Typography variant="subtitle1">{rest.cfg.title}</Typography>

        {handleClose && !rest.noCloseIcon ? (
          <IconButton aria-label="close" className="closeButton" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>

      {rest.cfg.topBar}

      <DialogContent className={contentClassName || ''}>{rest.cfg.body}</DialogContent>

      {rest.cfg?.buttons && (
        <DialogActions>
          {rest.cfg.actionsBody}
          {rest.cfg.buttons?.continue && (
            <Button onClick={handleSubmit} color="primary" autoFocus>
              {rest.cfg.continueButtonText || 'Продолжить'}
            </Button>
          )}

          {rest.cfg.buttons?.cancel && (
            <Button onClick={handleClose} color="secondary">
              {rest.cfg.cancelButtonText || 'Отменить'}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default CommonDialog;

export {
  DialogTitle, DialogContent, Dialog, DialogContentText, DialogActions, CommonDialog
};
