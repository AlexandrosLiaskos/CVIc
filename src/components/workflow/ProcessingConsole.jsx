import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ProcessingConsole() {
  const dispatch = useDispatch();
  const sensorConfig = useSelector(state => state.workflow.sensorConfig);
  const [processingState, setProcessingState] = useState({
    status: 'idle', // idle, running, paused, completed, error
    progress: {
      imageCollection: 0,
      compositeGeneration: 0,
      waterMask: 0,
      vectorization: 0
    },
    systemResources: {
      cpu: 0,
      memory: 0
    },
    messages: []
  });

  const startProcessing = () => {
    setProcessingState(prev => ({
      ...prev,
      status: 'running',
      messages: [...prev.messages, 'Starting processing...']
    }));
    // Simulate processing steps
    simulateProcessing();
  };

  const simulateProcessing = () => {
    // This is a placeholder for actual processing logic
    const steps = ['imageCollection', 'compositeGeneration', 'waterMask', 'vectorization'];
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setProcessingState(prev => ({
          ...prev,
          status: 'completed',
          messages: [...prev.messages, 'Processing completed successfully']
        }));
        return;
      }

      const step = steps[currentStep];
      setProcessingState(prev => ({
        ...prev,
        progress: {
          ...prev.progress,
          [step]: Math.min(100, prev.progress[step] + 20)
        },
        messages: [...prev.messages, `Processing ${step}: ${prev.progress[step] + 20}%`]
      }));

      if (prev.progress[step] >= 100) {
        currentStep++;
      }
    }, 1000);
  };

  const handlePause = () => {
    setProcessingState(prev => ({
      ...prev,
      status: 'paused',
      messages: [...prev.messages, 'Processing paused']
    }));
  };

  const handleCancel = () => {
    setProcessingState(prev => ({
      ...prev,
      status: 'idle',
      progress: {
        imageCollection: 0,
        compositeGeneration: 0,
        waterMask: 0,
        vectorization: 0
      },
      messages: [...prev.messages, 'Processing cancelled']
    }));
  };

  return (
    <div className="processing-console">
      <h2>Processing Console</h2>

      <div className="processing-status">
        <h3>Status: {processingState.status}</h3>

        <div className="progress-sections">
          <div className="progress-item">
            <label>Image Collection</label>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${processingState.progress.imageCollection}%` }}
              />
            </div>
            <span>{processingState.progress.imageCollection}%</span>
          </div>

          <div className="progress-item">
            <label>Composite Generation</label>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${processingState.progress.compositeGeneration}%` }}
              />
            </div>
            <span>{processingState.progress.compositeGeneration}%</span>
          </div>

          <div className="progress-item">
            <label>Water Mask Generation</label>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${processingState.progress.waterMask}%` }}
              />
            </div>
            <span>{processingState.progress.waterMask}%</span>
          </div>

          <div className="progress-item">
            <label>Vectorization</label>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${processingState.progress.vectorization}%` }}
              />
            </div>
            <span>{processingState.progress.vectorization}%</span>
          </div>
        </div>
      </div>

      <div className="system-resources">
        <h3>System Resources</h3>
        <div className="resource-monitors">
          <div className="resource-item">
            <label>CPU Usage</label>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${processingState.systemResources.cpu}%` }}
              />
            </div>
            <span>{processingState.systemResources.cpu}%</span>
          </div>

          <div className="resource-item">
            <label>Memory Usage</label>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${processingState.systemResources.memory}%` }}
              />
            </div>
            <span>{processingState.systemResources.memory}%</span>
          </div>
        </div>
      </div>

      <div className="console-messages">
        <h3>Processing Log</h3>
        <div className="message-container">
          {processingState.messages.map((message, index) => (
            <div key={index} className="message">
              {message}
            </div>
          ))}
        </div>
      </div>

      <div className="processing-controls">
        {processingState.status === 'idle' && (
          <button
            className="primary-button"
            onClick={startProcessing}
          >
            Start Processing
          </button>
        )}

        {processingState.status === 'running' && (
          <>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        )}

        {processingState.status === 'completed' && (
          <button
            className="primary-button"
            onClick={() => dispatch({ type: 'SET_WORKFLOW_STEP', payload: 'results' })}
          >
            View Results
          </button>
        )}
      </div>

      <div className="workflow-actions">
        <button
          onClick={() => dispatch({ type: 'SET_WORKFLOW_STEP', payload: 'sensor' })}
          disabled={processingState.status === 'running'}
        >
          Back
        </button>
      </div>
    </div>
  );
}
