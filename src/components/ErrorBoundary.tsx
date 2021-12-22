import React, { Component, Fragment, ErrorInfo, ReactNode } from "react";
import PropTypes from "prop-types";

interface Props {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  fallback?: ReactNode;
}

interface State {
  failed: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { failed: false };
  }

  public state: State = { failed: false };
  static getDerivedStateFromError(_: Error): State {
    return { failed: true };
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError } = this.props;
    if (typeof onError !== "function") return;
    try {
      onError(error, errorInfo);
    } catch (e) {
      // do nothing
    }
  }
  public render() {
    const { fallback = "Error", children } = this.props;
    return this.state.failed ? <Element>{fallback}</Element> : children;
  }
}

interface ElementProps {
  children: ReactNode;
}

const Element = ({ children }: ElementProps): JSX.Element =>
  React.isValidElement(children) ? children : <Fragment>{children}</Fragment>;

export default ErrorBoundary;
