import React from "react";

interface ErrorBoundaryProps {
  FallbackComponent: React.ComponentType<{
    error: Error;
    resetErrorBoundary: () => void;
  }>;
  onReset?: () => void;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  resetErrorBoundary = (): void => {
    this.props.onReset?.();
    this.setState({ error: null });
  };

  componentDidCatch(error: Error): void {
    console.error(error);
  }

  render(): React.ReactNode {
    const { error } = this.state;
    const { FallbackComponent } = this.props;

    if (error) {
      return (
        <FallbackComponent
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
