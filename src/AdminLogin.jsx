import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminLogin() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the unified login page
    navigate("/login");
  }, []);

  return (
    <div className="container">
      <p>Redirecting to login...</p>
    </div>
  );
}

export default AdminLogin;