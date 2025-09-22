import { Component, type ErrorInfo, type ReactNode } from "react";
import { Container, Card, Button } from "react-bootstrap";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container className="py-5">
          <Card
            className="border-0 shadow-lg text-center"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
              borderRadius: "20px",
            }}
          >
            <Card.Body className="p-5">
              <div
                className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                style={{
                  width: "100px",
                  height: "100px",
                  background:
                    "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
                  borderRadius: "50%",
                  fontSize: "3rem",
                }}
              >
                ⚠️
              </div>
              <h1 className="display-5 fw-bold text-danger mb-3">
                Oops! Something went wrong
              </h1>
              <p className="lead text-muted mb-4">
                We're sorry, but something unexpected happened. Please try
                again.
              </p>
              {this.state.error && (
                <details className="mb-4">
                  <summary className="text-muted small">Error Details</summary>
                  <pre className="text-start text-muted small mt-2 p-3 bg-light rounded">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              <div className="d-flex gap-3 justify-content-center">
                <Button
                  variant="primary"
                  onClick={this.handleRetry}
                  className="rounded-pill px-4 py-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                  }}
                >
                  🔄 Try Again
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => (window.location.href = "/")}
                  className="rounded-pill px-4 py-2"
                >
                  🏠 Go Home
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
