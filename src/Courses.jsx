import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const resp = await axios.get("http://localhost:8080/api/courses");
      setCourses(resp.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1>Available Programs</h1>
        <p style={{color: 'var(--text-muted)'}}>{courses.length} Programs Found</p>
      </div>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="grid">
          {courses.map(course => (
            <div key={course.id} className="course-card" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                 <span className="status-badge status-applied">{course.degreeType}</span>
                 <span style={{color: 'var(--accent)', fontSize: '0.8rem', fontWeight: '600'}}>{course.availableSeats} Seats Left</span>
              </div>
              
              <h3 style={{margin: '0 0 0.5rem 0', minHeight: '3.5rem'}}>{course.courseName}</h3>
              <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem'}}>Duration: {course.duration} Years</p>
              
              <div style={{marginTop: 'auto'}}>
                <div style={{width: '100%', height: '6px', background: 'var(--glass)', borderRadius: '3px', overflow: 'hidden', marginBottom: '1.5rem'}}>
                  <div style={{
                    width: `${(course.availableSeats / course.totalSeats) * 100}%`, 
                    height: '100%', 
                    background: 'var(--accent)'
                  }}></div>
                </div>
                
                <Link to="/apply" style={{textDecoration: 'none'}}>
                  <button className="primary" style={{width: '100%', padding: '0.8rem', borderRadius: '0.75rem'}}>
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;