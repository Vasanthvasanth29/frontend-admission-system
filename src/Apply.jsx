import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Apply() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    preference1: "",
    preference2: "",
    preference3: "",
    cutoffMark: ""
  });

  useEffect(() => {
    if (!user) navigate("/login");
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const resp = await axios.get("http://localhost:8080/api/courses");
      setCourses(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/applications", {
        ...formData,
        student: { id: user.id }
      });
      alert("Application submitted successfully!");
      navigate("/status");
    } catch (err) {
      console.error(err);
      alert("Error submitting application");
    }
  };

  return (
    <div className="container" style={{maxWidth: '700px'}}>
      <div className="card">
        <h1>Admission Application</h1>
        <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>Select your preferred courses and enter your merit details.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cutoff Mark / Academic Score</label>
            <input
              type="number"
              step="0.01"
              placeholder="e.g., 185.50"
              value={formData.cutoffMark}
              onChange={(e) => setFormData({...formData, cutoffMark: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Preference 1</label>
            <select 
              value={formData.preference1} 
              onChange={(e) => setFormData({...formData, preference1: e.target.value})}
              required
            >
              <option value="">Select Course</option>
              {courses.map(c => <option key={c.id} value={c.courseName}>{c.courseName}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Preference 2</label>
            <select 
              value={formData.preference2} 
              onChange={(e) => setFormData({...formData, preference2: e.target.value})}
              required
            >
              <option value="">Select Course</option>
              {courses.map(c => <option key={c.id} value={c.courseName}>{c.courseName}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Preference 3</label>
            <select 
              value={formData.preference3} 
              onChange={(e) => setFormData({...formData, preference3: e.target.value})}
              required
            >
              <option value="">Select Course</option>
              {courses.map(c => <option key={c.id} value={c.courseName}>{c.courseName}</option>)}
            </select>
          </div>

          <button type="submit" style={{width: '100%', marginTop: '1rem'}}>Submit Application</button>
        </form>
      </div>
    </div>
  );
}

export default Apply;