import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import ModalBox from '@/components/System/ModalBox';
import MyError from "@/services/MyError";

interface IErrorWindowState {
  message: string;
  statusCode: null | number| string;
  openDialog: boolean;
}

export default class ErrorWindow extends React.Component<{}, IErrorWindowState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      message: '',
      statusCode: null,
      openDialog: false,
    };
    this.closeDialog = this.closeDialog.bind(this);
    window.onerror = (msg, url, lineNo, columnNo, error) => {
      this.errorListener(error);
    };
    window.onunhandledrejection = e => {
      this.errorListener(e.reason);
    };
  }

  errorListener(e:  Error | undefined) {
    if (!e) return;
    let statusCode = null;
    if (e instanceof MyError) {
      statusCode = e.statusCode;
    }
    this.setState({
      message: e?.message || 'Error',
      statusCode: statusCode,
      openDialog: true,
    });
  }

  closeDialog() {
    this.setState({
      message: '',
      statusCode: null,
      openDialog: false,
    });
  }

  render() {
    return this.state.openDialog
      ? (
        <ModalBox show={this.state.openDialog} closeDialog={this.closeDialog}>
          <div className="errorWindow">
            <div>
              <ErrorIcon color="error" fontSize="large"/>
              <label className="logo">Error {this.state.statusCode}</label>
            </div>
            <span className="logo">{this.state.message}</span>
            <button onClick={() => this.closeDialog()}>Закрыть</button>
          </div>
        </ModalBox>
      )
      : null
  }
}
