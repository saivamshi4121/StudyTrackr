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
            {/* Welcome Screen - No Header/Footer */}
            <Route path="/" element={<WelcomeScreen />} />
            
            {/* All other routes - With Header/Footer */}
            <Route path="/home" element={
              <div className="w-full min-h-screen bg-white">
                <Header />
                <main className="w-full">
                  <Home />
                </main>
                <Footer />
              </div>
            } />
            
            <Route path="/features" element={
              <div className="w-full min-h-screen bg-white">
                <Header />
                <main className="w-full">
                  <Features />
                </main>
                <Footer />
              </div>
            } />
            
            <Route path="/pricing" element={
              <div className="w-full min-h-screen bg-white">
                <Header />
                <main className="w-full">
                  <Pricing />
                </main>
                <Footer />
              </div>
            } />
            
            <Route path="/contact" element={
              <div className="w-full min-h-screen bg-white">
                <Header />
                <main className="w-full">
                  <Contact />
                </main>
                <Footer />
              </div>
            } />
            
            <Route path="/login" element={
              <div className="w-full min-h-screen bg-white">
                <Header />
                <main className="w-full">
                  <Login />
                </main>
                <Footer />
              </div>
            } />
            
            <Route path="/register" element={
              <div className="w-full min-h-screen bg-white">
                <Header />
                <main className="w-full">
                  <Register />
                </main>
                <Footer />
              </div>
            } />
            
            <Route path="/principal/login" element={
              <div className="w-full min-h-screen bg-white">
                <Header />
                <main className="w-full">
                  <PrincipalLogin />
                </main>
                <Footer />
              </div>
            } />
            
            <Route
              path="/principal/teachers"
              element={
                <div className="w-full min-h-screen bg-white">
                  <Header />
                  <main className="w-full">
                    <PrivateRouteRole allowedRoles={['principal']}>
                      <PrincipalManageTeachers />
                    </PrivateRouteRole>
                  </main>
                  <Footer />
                </div>
              }
            />
            
            <Route
              path="/student/dashboard"
              element={
                <div className="w-full min-h-screen bg-white">
                  <Header />
                  <main className="w-full">
                    <PrivateRouteRole allowedRoles={['student']}>
                      <StudentDashboard />
                    </PrivateRouteRole>
                  </main>
                  <Footer />
                </div>
              }
            />
            
            <Route
              path="/teacher/dashboard"
              element={
                <div className="w-full min-h-screen bg-white">
                  <Header />
                  <main className="w-full">
                    <PrivateRouteRole allowedRoles={['teacher']}>
                      <TeacherDashboard />
                    </PrivateRouteRole>
                  </main>
                  <Footer />
                </div>
              }
            />
            
            <Route
              path="/dashboard"
              element={
                <div className="w-full min-h-screen bg-white">
                  <Header />
                  <main className="w-full">
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
