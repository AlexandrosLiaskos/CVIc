import { useDispatch } from 'react-redux';

export default function WelcomeScreen() {
  const dispatch = useDispatch();

  const handleStartNewProject = () => {
    dispatch({
      type: 'SET_PROJECT_STATE',
      payload: {
        name: 'New Project',
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        parameters: {},
        results: {}
      }
    });
    dispatch({
      type: 'SET_WORKFLOW_STEP',
      payload: 'aoi'
    });
  };

  const handleOpenProject = () => {
    // This would typically open a file picker dialog
    // For now, it's just a placeholder that would be connected to actual file handling logic
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.cvic,.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Read file contents and parse them
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const projectData = JSON.parse(event.target.result);
            dispatch({
              type: 'SET_PROJECT_STATE',
              payload: projectData
            });
            dispatch({
              type: 'SET_WORKFLOW_STEP',
              payload: 'aoi'
            });
          } catch (error) {
            alert('Could not parse project file: ' + error.message);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="welcome-header">
          <div className="title-section">
            <div className="logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1>Welcome to CVIc</h1>
            <h2>Coastal Vulnerability Index Compiler</h2>
            <p className="description">
              A powerful tool for analyzing and assessing coastal vulnerability through advanced satellite data processing
            </p>
          </div>

          <div className="welcome-buttons">
            <button onClick={handleStartNewProject} className="start-button">
              <div className="button-glow"></div>
              <span className="button-content">
                <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 4v16m8-8H4"/>
                </svg>
                <span>Start New Project</span>
              </span>
            </button>

            <button onClick={handleOpenProject} className="open-button">
              <div className="button-glow"></div>
              <span className="button-content">
                <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/>
                </svg>
                <span>Open Existing Project</span>
              </span>
            </button>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Multi-Source Support</h3>
              <p>Process data from multiple satellite sources including Sentinel-2 and Landsat</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Shoreline Detection</h3>
              <p>Advanced algorithms for accurate shoreline extraction and analysis</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Processing Console</h3>
              <p>Real-time monitoring and control of data processing operations</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Results Analysis</h3>
              <p>Comprehensive visualization and analysis of processing results</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>CVI Calculation</h3>
              <p>Automated computation of vulnerability indices with customizable parameters</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Interactive Mapping</h3>
              <p>Dynamic visualization of coastal areas with interactive tools for exploration</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .welcome-screen {
          height: 100%;
          background: #242424;
          color: #fff;
          padding: 1rem;
          display: grid;
          place-items: center;
          overflow: hidden;
        }

        .welcome-content {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-rows: auto 1fr;
          gap: 1rem;
        }

        .welcome-header {
          text-align: center;
          display: grid;
          gap: 1.5rem;
        }

        .title-section {
          display: grid;
          gap: 0.5rem;
        }

        .logo {
          width: 48px;
          height: 48px;
          margin: 0 auto;
          color: #4CAF50;
          animation: logoFloat 3s ease-in-out infinite;
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .welcome-header h1 {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 600;
          margin: 0;
          background: linear-gradient(120deg, #4CAF50, #45a049);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.5px;
        }

        .welcome-header h2 {
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          font-weight: 400;
          color: #888;
          margin: 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .description {
          font-size: clamp(0.8rem, 1.2vw, 0.9rem);
          color: #aaa;
          margin: 0;
          line-height: 1.4;
          max-width: 600px;
          margin: 0 auto;
        }

        .welcome-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .start-button, .open-button {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 4px;
          font-size: clamp(0.8rem, 1.2vw, 0.9rem);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2);
        }

        .open-button {
          background: #333;
          color: #eee;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .button-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(76, 175, 80, 0.4) 0%, transparent 70%);
          animation: rotate 4s linear infinite;
        }

        .open-button .button-glow {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .start-button:hover {
          background: #45a049;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
        }

        .open-button:hover {
          background: #444;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .start-button:active, .open-button:active {
          transform: translateY(0);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .button-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          z-index: 1;
        }

        .button-icon {
          width: 16px;
          height: 16px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 0.75rem;
          align-content: start;
          width: 100%;
        }

        .feature-card {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 4px;
          padding: 0.75rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #4CAF50, transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }

        .feature-card:hover {
          border-color: #4CAF50;
          background: rgba(76, 175, 80, 0.05);
          transform: translateY(-1px);
        }

        .feature-card:hover::before {
          transform: translateX(100%);
        }

        .feature-icon {
          width: 20px;
          height: 20px;
          color: #4CAF50;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1);
        }

        .feature-content {
          flex: 1;
          min-width: 0;
        }

        .feature-card h3 {
          font-size: clamp(0.8rem, 1.2vw, 0.9rem);
          margin: 0;
          margin-bottom: 0.25rem;
          color: #fff;
          font-weight: 500;
        }

        .feature-card p {
          margin: 0;
          color: #888;
          line-height: 1.3;
          font-size: clamp(0.75rem, 1vw, 0.85rem);
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: 1fr;
          }

          .welcome-buttons {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
