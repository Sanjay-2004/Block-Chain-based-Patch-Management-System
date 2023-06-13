import React, { useState, useEffect } from 'react';

export default function Fromusers() {
  const [unresolvedBugs, setUnresolvedBugs] = useState([]);
  const [resolvedBugs, setResolvedBugs] = useState([]);

  useEffect(() => {
    fetchBugReports();
  }, []);

  const fetchBugReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/bug-reports');
      const data = await response.json();

      const unresolved = data.filter((bug) => !bug.okbyReporter);
      const resolved = data.filter((bug) => bug.okbyReporter);

      setUnresolvedBugs(unresolved);
      setResolvedBugs(resolved);
    } catch (error) {
      console.error('Error fetching bug reports:', error);
    }
  };

  const handleCheckboxChange = async (event, bugId) => {
    const isChecked = event.target.checked;

    try {
      await fetch(`http://localhost:5000/bug-reports/${bugId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ okbyReporter: isChecked }),
      });

      // Refresh the bug reports after an update
      fetchBugReports();
    } catch (error) {
      console.error('Error updating bug report:', error);
    }
  };

  return (
    <div className="d-flex m-3">
      <div className="w-50">
        <h2 >NEW BUGS:</h2>
        <ul className="list-group mt-2" id="bugsByUsers">
          {unresolvedBugs.map((bug) => (
            <li className="list-group-item" key={bug._id}>
              <strong>Email:</strong> {bug.email}
              <br />
              <strong>Bug Description:</strong> {bug.bugDescription}
              <br />
              <label>
                Mark as resolved:
                <input
                  className='ms-2'
                  type="checkbox"
                  checked={bug.okbyReporter}
                  onChange={(event) => handleCheckboxChange(event, bug._id)}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-50">
        <h2>RESOLVED:</h2>
        <ul className="list-group mt-2" id="resolvedBugs">
          {resolvedBugs.map((bug) => (
            <li className="list-group-item" key={bug._id}>
              <strong>Email:</strong> {bug.email}
              <br />
              <strong>Bug Description:</strong> {bug.bugDescription}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

