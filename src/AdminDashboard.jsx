import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container">
      <h1>Admin Control Center</h1>
      <p style={{color: 'var(--text-muted)', marginBottom: '3rem'}}>Welcome back, {user?.name}. Manage courses and process admissions from here.</p>
      
      <div className="grid">
        <div className="card">
          <h2 style={{color: 'var(--primary)'}}>Course Management</h2>
          <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>Add, edit, or remove engineering programs and configure seat limits.</p>
          <Link to="/manage-courses"><button style={{width: '100%'}}>Manage Courses</button></Link>
        </div>

        <div className="card">
          <h2 style={{color: 'var(--accent)'}}>Admission Queue</h2>
          <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>Review student applications and process sequential seat allocations.</p>
          <Link to="/manage-applications"><button style={{width: '100%', background: 'var(--accent)'}}>Process Applications</button></Link>
        </div>

        <div className="card">
          <h2 style={{color: '#f59e0b'}}>System Statistics</h2>
          <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>View insights on application volumes and course popularities.</p>
          <button className="secondary" style={{width: '100%'}} onClick={() => alert("Statistics module coming soon!")}>View Reports</button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;