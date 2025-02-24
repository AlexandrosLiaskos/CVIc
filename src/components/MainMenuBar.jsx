import { useDispatch } from 'react-redux';

export default function MainMenuBar() {
  const dispatch = useDispatch();

  const handleNewProject = () => {
    dispatch({
      type: 'SET_PROJECT_STATE',
      payload: {
        name: 'New Project',
        created: new Date(),
        modified: new Date(),
        parameters: {},
        results: {}
      }
    });
    dispatch({
      type: 'SET_WORKFLOW_STEP',
      payload: 'aoi'
    });
  };

  return (
    <div className="menu-bar">
      <div className="menu-item">
        <button>File</button>
        <div className="dropdown-content">
          <button onClick={handleNewProject}>New Project</button>
          <button>Open Project</button>
          <button>Save Session</button>
          <button>Exit</button>
        </div>
      </div>

      <div className="menu-item">
        <button>Tools</button>
        <div className="dropdown-content">
          <button>Shoreline Extraction</button>
          <button>Geomorphology</button>
          <button>Slope</button>
          <button>Mean Wave Height</button>
          <button>Mean Tidal Range</button>
          <button>Relative Sea Level</button>
          <button>Coastal Erosion/Accretion</button>
          <button>CVI Calculator</button>
        </div>
      </div>

      <div className="menu-item">
        <button>Settings</button>
        <div className="dropdown-content">
          <button>General</button>
          <button>User Preferences</button>
          <button>About</button>
        </div>
      </div>

      <div className="menu-item">
        <button>Help</button>
        <div className="dropdown-content">
          <button>Documentation</button>
          <button>Examples</button>
          <button>Support</button>
        </div>
      </div>
    </div>
  );
}
