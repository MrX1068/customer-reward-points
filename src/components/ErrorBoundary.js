import React from "react";
import PropTypes from "prop-types";
import log from "../utils/logger";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });

    log.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <div className="error-icon">🚨</div>
          <h3>Something went wrong</h3>
          <p>Sorry, an unexpected error occurred.</p>
          {process.env.MODE === "development" && this.state.error && (
            <details
              style={{
                whiteSpace: "pre-wrap",
                color: "#e74c3c",
                marginTop: "1rem",
              }}
            >
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  logger: PropTypes.func,
};

export default ErrorBoundary;
