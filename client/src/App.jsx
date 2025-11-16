import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WelcomeScreen from './pages/WelcomeScreen';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
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
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/*" element={
              <div className="w-full min-h-screen bg-white">
                <Header />
                <main className="w-full">
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/contact" element={<Contact />} />
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
                        </main>
                        <Footer />
                      </div>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
