import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { earthEngineService } from '../services/EarthEngineService';

function SensorSelection() {
  const dispatch = useDispatch();
  const sensorConfig = useSelector(state => state.workflow.sensorConfig);

  const handleSourceTypeChange = async (type) => {
    if (type === 'GEE') {
      try {
        await earthEngineService.signIn();
        // Handle successful authentication
      } catch (error) {
        console.error('Failed to connect:', error);
        // Handle authentication failure
      }
    }

    dispatch({
      type: 'SET_SENSOR_CONFIG',
      payload: { sourceType: type }
    });
  };

  return (
    <div className="sensor-selection">
      <div className="source-toggle">
        <label>
          <input
            type="radio"
            name="sourceType"
            value="GEE"
            checked={sensorConfig.sourceType === 'GEE'}
            onChange={() => handleSourceTypeChange('GEE')}
          />
          GEE Collection
        </label>
        <label>
          <input
            type="radio"
            name="sourceType"
            value="LOCAL"
            checked={sensorConfig.sourceType === 'LOCAL'}
            onChange={() => handleSourceTypeChange('LOCAL')}
          />
          Local File
        </label>
        <label>
          <input
            type="radio"
            name="sourceType"
            value="PREPROCESSED"
            checked={sensorConfig.sourceType === 'PREPROCESSED'}
            onChange={() => handleSourceTypeChange('PREPROCESSED')}
          />
          Pre-processed
        </label>
      </div>

      {sensorConfig.sourceType && (
        <SensorTypeSelector />
      )}
    </div>
  );
}

export default SensorSelection;
