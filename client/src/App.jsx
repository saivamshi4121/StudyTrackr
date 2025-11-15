import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrincipalLogin from './pages/PrincipalLogin';
import PrincipalManageTeachers from './pages/PrincipalManageTeachers';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import PrivateRouteRole from './components/PrivateRouteRole';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/principal/login" element={<PrincipalLogin />} />
          <Route
            path="/principal/teachers"
            element={
              <PrivateRouteRole allowedRoles={['principal']}>
                <PrincipalManageTeachers />
              </PrivateRouteRole>
            }
          />
          <Route
            path="/student/dashboard"
            element={
              <PrivateRouteRole allowedRoles={['student']}>
                <StudentDashboard />
              </PrivateRouteRole>
            }
          />
          <Route
            path="/teacher/dashboard"
            element={
              <PrivateRouteRole allowedRoles={['teacher']}>
                <TeacherDashboard />
              </PrivateRouteRole>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
