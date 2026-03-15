import { useEffect, useState } from "react";
import axios from "axios";

function ManageCourse() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseName: "",
    degreeType: "B.E",
    duration: 4,
    totalSeats: 60
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const resp = await axios.get("http://localhost:8080/api/courses");
    setCourses(resp.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/courses", formData);
    setFormData({ courseName: "", degreeType: "B.E", duration: 4, totalSeats: 60 });
    fetchCourses();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this course?")) {
      await axios.delete(`http://localhost:8080/api/courses/${id}`);
      fetchCourses();
    }
  };

  return (
    <div className="container">
      <h1>Manage Engineering Courses</h1>
      
      <div className="grid" style={{gridTemplateColumns: '1fr 2fr'}}>
        <div className="card" style={{height: 'fit-content'}}>
          <h3>Add New Course</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Course Name</label>
              <input 
                value={formData.courseName} 
                onChange={e => setFormData({...formData, courseName: e.target.value})}
                placeholder="e.g., Computer Science"
                required
              />
            </div>
            <div className="form-group">
              <label>Degree Type</label>
              <select value={formData.degreeType} onChange={e => setFormData({...formData, degreeType: e.target.value})}>
                <option value="B.E">B.E</option>
                <option value="B.Tech">B.Tech</option>
              </select>
            </div>
            <div className="form-group">
              <label>Duration (Years)</label>
              <input type="number" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Total Seats</label>
              <input type="number" value={formData.totalSeats} onChange={e => setFormData({...formData, totalSeats: e.target.value})} />
            </div>
            <button type="submit" style={{width: '100%'}}>Add Course</button>
          </form>
        </div>

        <div className="card">
          <h3>Existing Programs</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Degree</th>
                <th>Seats (Avail/Total)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c.id}>
                  <td>{c.courseName}</td>
                  <td>{c.degreeType}</td>
                  <td>{c.availableSeats} / {c.totalSeats}</td>
                  <td>
                    <button onClick={() => handleDelete(c.id)} className="secondary" style={{color: '#ef4444', padding: '0.4rem'}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageCourse;