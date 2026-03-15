import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role?.toUpperCase() === "ADMIN";

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className={`navbar ${isAdmin ? 'admin-mode' : ''}`}>
      <Link to="/" className="logo">
        EduAdmit {isAdmin && <span style={{fontSize: '0.7rem', verticalAlign: 'middle', border: '1px solid var(--secondary)', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px'}}>ADMIN</span>}
      </Link>
      
      <div className="navbar-links">
        <Link to="/">Home</Link>
        
        {user ? (
          <>
            {isAdmin ? (
              <>
                <Link to="/dashboard" style={{color: 'var(--primary)'}}>Dashboard</Link>
                <Link to="/manage-courses">Manage Courses</Link>
                <Link to="/manage-applications">Process Queue</Link>
              </>
            ) : (
              <>
                <Link to="/courses">Courses</Link>
                <Link to="/apply">Apply Now</Link>
                <Link to="/status">My Status</Link>
              </>
            )}
            <button onClick={logout} className="secondary" style={{padding: '0.4rem 1rem', marginLeft: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)'}}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" style={{background: 'var(--primary)', color: 'white', padding: '0.4rem 1rem', borderRadius: '0.5rem'}}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;