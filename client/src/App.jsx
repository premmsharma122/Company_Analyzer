// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
// import Login from './pages/Login.jsx';
// import Signup from './pages/Signup.jsx';
// import Home from './pages/home.jsx';
// import CompanySelect from './pages/companyselect.jsx';
// import Footer from './components/footer.jsx';

// // ---------------- AUTH CONTEXT ----------------
// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// // ------------------------------------------------

// // A layout component to handle the overall structure
// const MainLayout = () => {
//   const { isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="relative min-h-screen font-sans">
//       <div className="absolute inset-0 bg-black/40"></div>

//       <div className="relative z-10 flex flex-col min-h-screen">
//         <header className="py-4 px-8 flex justify-between items-center text-white">
//           <div className="font-bold text-2xl font-inter">
//             <Link to="/">Your Logo</Link>
//           </div>
//           <nav className="flex items-center space-x-6">
//             {!isAuthenticated ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-4 py-2 rounded-full font-semibold transition-transform duration-200 transform hover:scale-105 hover:bg-white hover:text-blue-600 bg-transparent text-white border-2 border-white"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="px-4 py-2 rounded-full font-semibold transition-transform duration-200 transform hover:scale-105 bg-white text-blue-600"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 rounded-full font-semibold transition-transform duration-200 transform hover:scale-105 bg-red-500 text-white"
//               >
//                 Logout
//               </button>
//             )}
//           </nav>
//         </header>

//         <Outlet />

//         <Footer />
//       </div>
//     </div>
//   );
// };

// // The main App component with routing
// const App = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route index element={<Home />} />
//           <Route path="login" element={<Login />} />
//           <Route path="signup" element={<Signup />} />
//           {/* A protected route that only shows when authenticated */}
//           <Route
//             path="company-select"
//             element={isAuthenticated ? <CompanySelect /> : <Login />}
//           />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// // Wrap App inside AuthProvider
// export default function WrappedApp() {
//   return (
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   );
// // }
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
// import Login from './pages/Login.jsx';
// import Signup from './pages/Signup.jsx';
// import Home from './pages/home.jsx';
// import CompanySelect from './pages/companyselect.jsx';
// import Footer from './components/footer.jsx';

// // A custom hook to check for authentication and listen for changes
// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsAuthenticated(!!localStorage.getItem('token'));
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);
  
//   return isAuthenticated;
// };

// // A layout component to handle the overall structure
// const MainLayout = () => {
//   const isAuthenticated = useAuth();
//   const navigate = useNavigate();
  
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="relative min-h-screen font-sans">
//       <div className="absolute inset-0 bg-black/40"></div>
      
//       <div className="relative z-10 flex flex-col min-h-screen">
//         <header className="py-4 px-8 flex justify-between items-center text-white">
//           <div className="font-bold text-2xl font-inter">
//             <Link to="/">Your Logo</Link>
//           </div>
//           <nav className="flex items-center space-x-6">
//             {!isAuthenticated ? (
//               <>
//                 <Link to="/login" className="px-4 py-2 rounded-full font-semibold transition-transform duration-200 transform hover:scale-105 hover:bg-white hover:text-blue-600 bg-transparent text-white border-2 border-white">
//                   Login
//                 </Link>
//                 <Link to="/signup" className="px-4 py-2 rounded-full font-semibold transition-transform duration-200 transform hover:scale-105 bg-white text-blue-600">
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 rounded-full font-semibold transition-transform duration-200 transform hover:scale-105 bg-red-500 text-white"
//               >
//                 Logout
//               </button>
//             )}
//           </nav>
//         </header>

//         <Outlet />
        
//         <Footer />
//       </div>
//     </div>
//   );
// };

// // The main App component with routing
// const App = () => {
//   const isAuthenticated = useAuth();

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route index element={<Home />} />
//           <Route path="login" element={<Login />} />
//           <Route path="signup" element={<Signup />} />
//           {/* A protected route that only shows when authenticated */}
//           <Route path="company-select" element={isAuthenticated ? <CompanySelect /> : <Login />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;
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
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
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

// The main App component with routing
const App = () => {
  const isAuthenticated = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          {/* A protected route that only shows when authenticated */}
          <Route path="company-select" element={isAuthenticated ? <CompanySelect /> : <Login />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;