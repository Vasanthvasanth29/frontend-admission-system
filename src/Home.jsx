import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container" style={{textAlign: 'center', marginTop: '10vh'}}>
      <h1 style={{fontSize: '3.5rem', marginBottom: '1rem'}}>
        Shape Your <span style={{color: 'var(--primary)'}}>Future</span> in Engineering
      </h1>
      <p style={{fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2.5rem'}}>
        Our advanced admission system streamlines your journey to the world's top engineering programs. 
        Apply online, track your status, and secure your seat today.
      </p>
      
      <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
        <Link to="/register">
          <button style={{padding: '1rem 2.5rem', fontSize: '1.1rem'}}>Get Started</button>
        </Link>
        <Link to="/courses">
          <button className="secondary" style={{padding: '1rem 2.5rem', fontSize: '1.1rem'}}>Browse Courses</button>
        </Link>
      </div>

      <div className="grid" style={{marginTop: '5rem'}}>
        <div className="card" style={{padding: '2rem'}}>
          <h3>Digital First</h3>
          <p style={{color: 'var(--text-muted)'}}>100% online application process from anywhere in the world.</p>
        </div>
        <div className="card" style={{padding: '2rem'}}>
          <h3>Smart Allocation</h3>
          <p style={{color: 'var(--text-muted)'}}>Automated seat allocation based on your merit and preferences.</p>
        </div>
        <div className="card" style={{padding: '2rem'}}>
          <h3>Real-time Tracking</h3>
          <p style={{color: 'var(--text-muted)'}}>Stay updated with instant notifications on your application status.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;