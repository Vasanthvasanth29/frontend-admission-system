import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "STUDENT"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", formData);
      if (response.data) {
        alert("Registration Successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        alert(error.response.data || "Registration failed. Please try again.");
      } else if (error.request) {
        // The request was made but no response was received
        alert("Server not reachable. Please ensure the Backend is running.");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container" style={{maxWidth: '600px'}}>
      <div className="card">
        <h1>Create Account</h1>
        <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>Join our engineering community today</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              name="phone"
              placeholder="+1 234 567 890"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>I am a...</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="STUDENT">Student (Applicant)</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>

          <button type="submit" style={{width: '100%'}}>Create Account</button>
        </form>

        <p style={{marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem'}}>
          Already have an account? <Link to="/login" style={{color: 'var(--primary)', fontWeight: '600'}}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;