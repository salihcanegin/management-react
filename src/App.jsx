import { BrowserRouter, Routes, Route } from "react-router-dom";
import Department from "./components/department/Department";
import DepartmentList from "./components/department/DepartmentList";
import CourseList from "./components/course/CourseList";
import Course from "./components/course/Course";
import Layout from "./components/common/Layout";
import Login from "./components/Login";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { Navigate } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={token ? <Layout /> : <Navigate to="/login" />}>
          <Route element={<ProtectedRoute />}>
            <Route path="departments" element={<DepartmentList />} />
            <Route path="departments/:departmentId" element={<Department />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="courses/:courseId" element={<Course />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
