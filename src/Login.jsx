import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password
      });

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        if (response.data.role === "ADMIN") {
          navigate("/dashboard");
        } else {
          navigate("/courses");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{maxWidth: '500px'}}>
      <div className="card">
        <h1>Welcome Back</h1>
        <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>Sign in to continue your application</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={{width: '100%'}} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem'}}>
          Don't have an account? <Link to="/register" style={{color: 'var(--primary)', fontWeight: '600'}}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;