
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', backgroundColor: '#2d1a1a', color: '#ffc1c1', border: '2px solid #a52a2a', borderRadius: '8px', margin: '1rem' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Application Error</h1>
          <p>The application failed to load. Please check the details below.</p>
          <details style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', marginTop: '1rem' }}>
            <summary>Error Details</summary>
            {this.state.error && <p>{this.state.error.toString()}</p>}
            {this.state.errorInfo && <p>{this.state.errorInfo.componentStack}</p>}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
