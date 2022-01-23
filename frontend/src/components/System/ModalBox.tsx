import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { observer } from 'mobx-react';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DialogContent} from "@material-ui/core";

interface IModalBoxProps {
  title?: string,
  show: boolean,
  closeDialog: () => void;
}

const ModalBox: React.FC<IModalBoxProps> = ({title, show, closeDialog, children}) => {

  return (
    <Dialog maxWidth="lg" onClose={() => closeDialog()} aria-labelledby="customized-dialog-title" open={show}>
      {title && <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>}
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default observer(ModalBox);
