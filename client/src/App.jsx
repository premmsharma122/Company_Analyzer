
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/home.jsx';
import CompanySelect from './pages/companyselect.jsx';
import Footer from './components/footer.jsx';
import useAuth from './hooks/useAuth.js'; // Correct import path

// A layout component to handle the overall structure
const MainLayout = () => {
  // ✅ Corrected: Destructure the object to get the boolean value
  const { isAuthenticated, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from the hook
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen font-sans">
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="py-4 px-8 flex justify-between items-center text-white">
          <div className="font-bold text-2xl font-inter">
            <Link to="/">Your Logo</Link>
          </div>
          <nav className="flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="px-4 py-2 rounded-full font-semibold transition-transform duration-200 transform hover:scale-105 hover:bg-white hover:text-blue-600 bg-transparent text-white border-2 border-white">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 rounded-full font-semibold transition-transform duration-200 transform hover:scale-105 bg-white text-blue-600">
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full font-semibold transition-transform duration-200 transform hover:scale-105 bg-red-500 text-white"
              >
                Logout
              </button>
            )}
          </nav>
        </header>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
    const { isAuthenticated } = useAuth(); // ✅ Corrected: Destructure here too

    return (
        <Router>
            <Routes>
                {/* The root route now contains the layout and nested routes */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="company-select" element={isAuthenticated ? <CompanySelect /> : <Login />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
