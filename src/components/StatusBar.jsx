import { useDispatch, useSelector } from 'react-redux';

export default function StatusBar() {
  const dispatch = useDispatch();
  const currentStep = useSelector(state => state?.workflow?.currentStep ?? 'welcome');

  const getWorkflowActions = () => {
    switch (currentStep) {
      case 'aoi':
        return {
          back: 'welcome',
          next: 'sensor',
          nextLabel: 'Confirm AOI',
          customHandler: () => {
            const event = new CustomEvent('showAOIConfirmation');
            window.dispatchEvent(event);
          }
        };
      case 'sensor':
        return {
          back: 'aoi',
          next: 'processing',
          nextLabel: 'Next: Processing'
        };
      case 'processing':
        return {
          back: 'sensor',
          next: 'results',
          nextLabel: 'View Results'
        };
      case 'results':
        return {
          back: 'processing',
          next: 'export',
          nextLabel: 'Next: Export'
        };
      case 'export':
        return {
          back: 'results',
          nextLabel: 'Export Results'
        };
      default:
        return null;
    }
  };

  const actions = getWorkflowActions();

  return (
    <div className="status-bar">
      <div className="status-message">Ready</div>

      {actions && (
        <div className="workflow-actions">
          <button
            onClick={() => dispatch({ type: 'SET_WORKFLOW_STEP', payload: actions.back })}
          >
            Back
          </button>
          {actions.next && (
            <button
              className="primary-button"
              onClick={actions.customHandler || (() =>
                dispatch({ type: 'SET_WORKFLOW_STEP', payload: actions.next })
              )}
            >
              {actions.nextLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
