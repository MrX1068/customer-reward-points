import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Dashboard from "./components/Dashboard";
const App = () => (
  <ErrorBoundary>
    <Dashboard />
  </ErrorBoundary>
);

export default App;
