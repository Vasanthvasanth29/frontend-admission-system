import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Courses from "./Courses";
import Apply from "./Apply";
import Status from "./Status";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ManageCourse from "./ManageCourse";
import ManageApplication from "./ManageApplication";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/status" element={<Status />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/manage-courses" element={<ManageCourse />} />
        <Route path="/manage-applications" element={<ManageApplication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;