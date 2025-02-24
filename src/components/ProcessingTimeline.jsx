import { useSelector } from 'react-redux';

export default function ProcessingTimeline() {
  const currentStep = useSelector(state => state?.workflow?.currentStep ?? 'welcome');

  const steps = [
    { id: 'welcome', label: 'Welcome' },
    { id: 'aoi', label: 'Area Selection' },
    { id: 'sensor', label: 'Data Source' },
    { id: 'processing', label: 'Processing' },
    { id: 'results', label: 'Results' },
    { id: 'export', label: 'Export' }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  return (
    <div className="timeline">
      <h3>Workflow Progress</h3>
      <div className="timeline-items">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = index <= getCurrentStepIndex();
          return (
            <div
              key={step.id}
              className={`timeline-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="timeline-marker">
                {isCompleted ? '✓' : index + 1}
              </div>
              <div className="timeline-content">
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        .timeline {
          padding: 1rem;
          flex: 1;
        }

        .timeline h3 {
          margin-bottom: 1rem;
          color: #fff;
        }

        .timeline-items {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .timeline-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem;
          border-radius: 4px;
          background: #1a1a1a;
          border: 1px solid #333;
          transition: all 0.2s ease;
        }

        .timeline-marker {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #333;
          color: #888;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .timeline-content {
          color: #888;
          font-size: 0.9rem;
        }

        .timeline-item.completed .timeline-marker {
          background: #4CAF50;
          color: white;
        }

        .timeline-item.completed .timeline-content {
          color: #ccc;
        }

        .timeline-item.active {
          border-color: #4CAF50;
          background: rgba(76, 175, 80, 0.1);
        }

        .timeline-item.active .timeline-marker {
          background: #4CAF50;
          color: white;
        }

        .timeline-item.active .timeline-content {
          color: #fff;
        }
      `}</style>
    </div>
  );
}
