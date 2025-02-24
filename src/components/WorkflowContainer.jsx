import { useSelector } from 'react-redux';
import AOISelection from './workflow/AOISelection';
import SensorSelection from './workflow/SensorSelection';
import ProcessingConsole from './workflow/ProcessingConsole';
import ResultsViewer from './workflow/ResultsViewer';
import ExportPanel from './workflow/ExportPanel';
import WelcomeScreen from './workflow/WelcomeScreen';

export default function WorkflowContainer() {
  const currentStep = useSelector(state => state?.workflow?.currentStep ?? 'welcome');

  const renderWorkflowStep = () => {
    switch (currentStep) {
      case 'aoi':
        return <AOISelection />;
      case 'sensor':
        return <SensorSelection />;
      case 'processing':
        return <ProcessingConsole />;
      case 'results':
        return <ResultsViewer />;
      case 'export':
        return <ExportPanel />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="workflow-container">
      {renderWorkflowStep()}
    </div>
  );
}
