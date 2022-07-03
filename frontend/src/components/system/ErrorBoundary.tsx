import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      hasError: false
    };
  }

  /*
  * State updates for next render would up safe ui
  */
  static getDerivedStateFromError(error) {
    return {
      error,
      hasError: true
    };
  }

  render() {
    if (this.state.hasError) {
      this.props.throwError(null, null, null, null, this.state.error);

      return this.props.children;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
