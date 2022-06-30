import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

import Draggable from 'react-draggable';

import {
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  CloseIcon,
  Paper,
  DialogActions,
} from 'ui-kit';

import './FloatingWindow.scss';

interface FloatingWindowProps {
  className?: string;
  children: React.ReactNode;
  isDraggable: boolean;
  open: boolean;
  title?: string;
  width?: number;
  height?: number;
  position?: { x: number; y: number };
  anchorEl?: Element;
  anchorIndent?: number;
  onClose?: Function;
  onChangeOffset?: Function;
  actionsBody?: JSX.Element;
}

function FloatingWindow(props: FloatingWindowProps) {
  const onDragStop = (e, data) => {
    if (props.onChangeOffset) {
      props.onChangeOffset({
        x: data.x,
        y: data.y,
      });
    }
  };

  const onCloseClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (props.onClose) {
      props.onClose();
    }
  };

  const defaultPosition = useMemo(() => {
    if (props.position) return props.position;
    if (props.anchorEl) {
      const anchorRect = props.anchorEl.getBoundingClientRect();
      return { x: anchorRect.left, y: anchorRect.bottom + props.anchorIndent };
    }
    const defaultX = (document.documentElement.clientWidth - props.width) / 2;
    const defaultY = (document.documentElement.clientHeight - props.height) / 2;
    return {
      x: defaultX,
      y: defaultY,
    };
  }, [props.anchorEl, props.position]);

  if (!props.open) return null;

  return ReactDOM.createPortal(
    <Draggable
      handle=".MuiDialogTitle-root"
      onStop={onDragStop}
      bounds="body"
      disabled={!props.isDraggable}
      defaultPosition={defaultPosition}
    >
      <Paper
        classes={{ root: `FloatingWindow ${props.className}` }}
        style={{
          width: props.width,
          height: props.height,
        }}
        elevation={3}
      >
        {props.title && (
          <DialogTitle
            style={{ cursor: props.isDraggable ? 'move' : 'unset' }}
            id="draggable-dialog-title"
          >
            <Typography variant="subtitle1">{props.title}</Typography>
            {props.onClose && (
              <IconButton aria-label="close" className="closeButton" onClick={onCloseClick}>
                <CloseIcon />
              </IconButton>
            )}
          </DialogTitle>
        )}
        <DialogContent>{props.children}</DialogContent>
        {props.actionsBody && <DialogActions>{props.actionsBody}</DialogActions>}
      </Paper>
    </Draggable>,
    document.getElementById('root')
  );
}

FloatingWindow.defaultProps = {
  className: '',
  title: '',
  width: 100,
  height: 100,
  anchorIndent: 8,
  isDraggable: true,
  position: undefined,
  anchorEl: undefined,
  onClose: undefined,
  onChangeOffset: undefined,
};

export default FloatingWindow;
