import { ReactElement } from 'react';
import { DialogProps } from '@mui/material';

export default interface IProps extends DialogProps {
  className?: string;
  contentClassName?: string;
  isOpen: boolean;
  onChange: (arg0: boolean) => void;
  onSubmit?: (arg: object) => void;
  width?: number;
  height?: number;
  PaperComponent?: ReactElement;
  dialogTitleProps?: string;
  noCloseIcon?: boolean;
  cfg: {
    title: string;
    body: string | ReactElement;
    icon?: ReactElement;
    topBar?: ReactElement;
    actionsBody?: string | ReactElement;
    buttons?: {
      cancel?: boolean;
      continue?: boolean;
    };
    continueButtonText?: string | null;
    cancelButtonText?: string | null;
  };
}
