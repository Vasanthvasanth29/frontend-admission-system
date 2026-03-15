import { useEffect, useState } from "react";
import axios from "axios";

function Status() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user) fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const resp = await axios.post("http://localhost:8080/api/applications/student", { id: user.id });
      setApplications(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Application Status</h1>
      
      {applications.length === 0 ? (
        <div className="card">
          <p>You haven't submitted any applications yet.</p>
        </div>
      ) : (
        <div className="grid">
          {applications.map(app => (
            <div key={app.id} className="card" style={{textAlign: 'left'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <div>
                  <h3 style={{marginBottom: '0.5rem'}}>Application #{app.id}</h3>
                  <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>Submitted Score: {app.cutoffMark}</p>
                </div>
                <span className={`status-badge status-${app.applicationStatus.toLowerCase()}`}>
                  {app.applicationStatus}
                </span>
              </div>
              
              <div style={{marginTop: '1.5rem'}}>
                <label>Preferences:</label>
                <ol style={{color: 'var(--text-muted)', fontSize: '0.85rem', paddingLeft: '1.2rem'}}>
                  <li>{app.preference1}</li>
                  <li>{app.preference2}</li>
                  <li>{app.preference3}</li>
                </ol>
              </div>

              {app.allocatedCourse && (
                <div style={{marginTop: '1.5rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.75rem', border: '1px solid rgba(16, 185, 129, 0.2)'}}>
                  <p style={{fontSize: '0.8rem', color: '#10b981', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.25rem'}}>Allocated Seat</p>
                  <p style={{fontSize: '1.1rem', fontWeight: '700'}}>{app.allocatedCourse}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Status;