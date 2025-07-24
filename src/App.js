import ErrorBoundary from "./components/ErrorBoundary";
import Dashboard from "./components/Dashboard";

// Main application component - wraps dashboard with error boundary for error handling
const App = () => (
  <ErrorBoundary>
    <Dashboard />
  </ErrorBoundary>
);

export default App;
