import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in COOLCOLORS app:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '60px 20px', maxWidth: '640px', margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif', textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '16px', color: '#0D1117' }}>Something went wrong</h2>
          <p style={{ color: '#5C6874', marginBottom: '20px', lineHeight: 1.6 }}>
            {this.state.error?.message || 'An unexpected error occurred while rendering the page.'}
          </p>
          {this.state.error?.stack && (
            <pre style={{ textAlign: 'left', background: '#F4F5F7', border: '1px solid #E1E4E8', padding: '14px', borderRadius: '8px', fontSize: '11px', color: '#D92231', overflow: 'auto', maxHeight: '180px', marginBottom: '24px' }}>
              {this.state.error.stack}
            </pre>
          )}
          <button
            onClick={() => {
              try { localStorage.removeItem('cc-cart'); } catch { /* ignore */ }
              window.location.href = '/';
            }}
            style={{
              padding: '12px 24px',
              backgroundColor: '#0D1117',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            Clear Cache & Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
