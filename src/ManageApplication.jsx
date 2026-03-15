import { useEffect, useState } from "react";
import axios from "axios";

function ManageApplication() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const resp = await axios.get("http://localhost:8080/api/applications");
    setApplications(resp.data);
  };

  const handleAllocate = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/applications/${id}/allocate`);
      fetchApplications();
    } catch (err) {
      alert("Error during allocation: " + err.response?.data || err.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    await axios.put(`http://localhost:8080/api/applications/${id}/status?status=${status}`);
    fetchApplications();
  };

  return (
    <div className="container">
      <h1>Admission Applications</h1>
      
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Cutoff</th>
              <th>Preferences</th>
              <th>Status</th>
              <th>Allocated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.student?.name}</td>
                <td>{app.cutoffMark}</td>
                <td>
                  <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                    1. {app.preference1}<br/>
                    2. {app.preference2}<br/>
                    3. {app.preference3}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${app.applicationStatus.toLowerCase()}`}>
                    {app.applicationStatus}
                  </span>
                </td>
                <td>{app.allocatedCourse || '-'}</td>
                <td>
                  <div style={{display: 'flex', gap: '0.5rem'}}>
                    {app.applicationStatus === 'APPLIED' && (
                      <button onClick={() => handleAllocate(app.id)} style={{padding: '0.4rem 0.8rem', fontSize: '0.8rem'}}>Process Allocation</button>
                    )}
                    <button onClick={() => handleStatusChange(app.id, 'REJECTED')} className="secondary" style={{color: '#ef4444', padding: '0.4rem 0.8rem', fontSize: '0.8rem'}}>Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageApplication;