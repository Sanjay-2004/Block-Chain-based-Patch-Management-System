import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FromUsers() {
  const [bugReports, setBugReports] = useState([]);

  useEffect(() => {
    fetchBugReports();
  }, []);

  const fetchBugReports = async () => {
    try {
      const response = await axios.get('http://localhost:8080/bugs');
      const data = response.data;

      setBugReports(data);
    } catch (error) {
      console.error('Error fetching bug reports:', error);
    }
  };

  const handleCheckboxChange = async (event, bugId) => {
    const isChecked = event.target.checked;

    try {
      await axios.put(`http://localhost:8080/bugs/${bugId}`, { okbyReporter: isChecked });

      fetchBugReports();
    } catch (error) {
      console.error('Error updating bug report:', error);
    }
  };

  return (
    <div className="d-flex m-3">
      <div className="w-50">
        <h2>NEW BUGS:</h2>
        <ul className="list-group my-2" id="bugsByUsers">
          {bugReports
            .filter((bug) => !bug.okbyReporter)
            .map((bug) => (
              <li className="list-group-item" key={bug._id}>
                <strong>Email:</strong> {bug.email}
                <br />
                <strong>Bug Description:</strong> {bug.bugDescription}
                <br />
                <label>
                  Mark as resolved:
                  <input
                    className="ms-2"
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
        <ul className="list-group my-2" id="resolvedBugs">
          {bugReports
            .filter((bug) => bug.okbyReporter)
            .map((bug) => (
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
