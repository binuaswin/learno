// frontend/src/components/ErrorBoundary.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    console.log('ErrorBoundary - Caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary - Error details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-4">
          <h1 className="text-red-500">Something went wrong.</h1>
          <p>{this.state.error?.message || 'Unknown error'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Add propTypes validation
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired, // Validate children as a required prop
};

export default ErrorBoundary;