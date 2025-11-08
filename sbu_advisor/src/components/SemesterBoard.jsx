import './SemesterBoard.css';

// Expected semester shape
// {
//   id: 'fall-2025',
//   label: 'Semester 1 (Fall 2025)',
//   courses: [ { id: 'CSE 214', name: 'Data Structures', credits: 4, status: 'prereq-issue' | 'valid' } ],
//   totalCredits: 4
// }

export default function SemesterBoard({ semesters = [] }) {
  return (
    <div className="sem-board">
      {semesters.map(sem => (
        <div key={sem.id} className="sem-column">
          <div className="sem-column-header">
            <h3 className="sem-title">{sem.label}</h3>
            <div className="sem-meta">
              <span className="badge credits" aria-label={`${sem.totalCredits} credits`}>{sem.totalCredits} credits</span>
              <span className={`badge status ${sem.courses.some(c => c.status === 'prereq-issue') ? 'bad' : 'good'}`}>
                {sem.courses.some(c => c.status === 'prereq-issue') ? 'Prereq Issue' : 'Valid'}
              </span>
            </div>
          </div>
          <div className="sem-course-stack">
            {sem.courses.map(c => (
              <details key={c.id} className="course-card" open>
                <summary className="course-summary">
                  <span className="drag-handle" aria-hidden="true">⋮⋮</span>
                  <div className="course-main">
                    <div className="course-header">
                      <span className="course-code">{c.id}</span>
                      <span className="course-credits" aria-label={`${c.credits} credits`}>{c.credits} cr</span>
                    </div>
                    <div className="course-name">{c.name}</div>
                  </div>
                </summary>
                {/* Future: expanded details body */}
              </details>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
