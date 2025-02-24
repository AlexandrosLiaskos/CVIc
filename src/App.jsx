import TitleBar from './components/TitleBar'
import MainMenuBar from './components/MainMenuBar'
import ProjectTree from './components/ProjectTree'
import ProcessingTimeline from './components/ProcessingTimeline'
import WorkflowContainer from './components/WorkflowContainer'
import StatusBar from './components/StatusBar'
import { Component } from 'react';

// Simple error boundary fallback
const ErrorFallback = ({ error }) => (
  <div className="error-fallback">
    <h2>Application Error</h2>
    <pre>{error.message}</pre>
    <p>Please refresh the page or contact support</p>
  </div>
);

class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-fallback">
          <h2>Application Error</h2>
          <pre>{this.state.error.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// Main application container
function CVIcApp() {
  return (
    <ErrorBoundary>
        <div className="app-container">
          <TitleBar />
          <MainMenuBar />
          <div className="main-content">
            <LeftPanel />
            <RightPanel />
          </div>
          <StatusBar />
        </div>
      </ErrorBoundary>
  );
}

// Left panel with project tree and timeline
function LeftPanel() {
  return (
    <div className="left-panel">
      <ProjectTree />
      <ProcessingTimeline />
    </div>
  );
}

// Right panel with workflow container
function RightPanel() {
  return (
    <div className="right-section">
      <div className="right-panel">
        <WorkflowContainer />
      </div>
    </div>
  );
}

export default CVIcApp;
