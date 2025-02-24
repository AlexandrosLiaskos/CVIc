import { useSelector } from 'react-redux';

export default function ProjectTree() {
  const project = useSelector(state => state?.project ?? {
    name: '',
    created: null,
    modified: null,
    parameters: {},
    results: {}
  });

  return (
    <div className="project-tree">
      <h3>Project Files</h3>
      {project.name ? (
        <ul>
          <li className="active">
            <span className="project-name">{project.name}</span>
            <span className="project-date">
              {new Date(project.created).toLocaleDateString()}
            </span>
          </li>
        </ul>
      ) : (
        <div className="no-projects">
          <p>No active project</p>
          <p className="hint">Create or open a project to begin</p>
        </div>
      )}
    </div>
  );
}
