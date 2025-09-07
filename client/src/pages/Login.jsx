// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../App'; // adjust the path if App.jsx is not in the same folder

// // const Login = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [message, setMessage] = useState('');
// //   const navigate = useNavigate();
// //   const { login } = useAuth(); // ✅ get login function from context

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await fetch('/api/auth/login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ email, password }),
// //       });
// //       const data = await response.json();
// //       if (response.ok) {
// //         login(data.token); // ✅ updates context + localStorage instantly
// //         setMessage('Login successful!');
// //         navigate('/'); // Redirect to home
// //       } else {
// //         setMessage(data.message || 'Login failed. Please check your credentials.');
// //       }
// //     } catch (error) {
// //       console.error('Login error:', error);
// //       setMessage('An error occurred. Please try again later.');
// //     }
// //   };

// //   return (
// //     <main className="flex-1 flex items-center justify-center p-4 min-h-screen">
// //       <div
// //         className="w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl 
// //         bg-black/40 backdrop-blur-lg border border-gray-700 text-white"
// //       >
// //         <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 font-inter">
// //           Login
// //         </h2>
// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           <div>
// //             <label className="block mb-2 font-medium">Email Address</label>
// //             <input
// //               type="email"
// //               className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
// //               placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //               placeholder="Enter your email"
// //             />
// //           </div>
// //           <div>
// //             <label className="block mb-2 font-medium">Password</label>
// //             <input
// //               type="password"
// //               className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
// //               placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //               placeholder="Enter your password"
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             className="w-full py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 
// //             bg-blue-500 text-white hover:bg-blue-600"
// //           >
// //             Login
// //           </button>
// //         </form>
// //         {message && (
// //           <p className="mt-4 text-center text-sm sm:text-base text-gray-300">{message}</p>
// //         )}
// //       </div>
// //     </main>
// //   );
// // };

// // export default Login;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../App'; // adjust the path if App.jsx is not in the same folder

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const { login } = useAuth(); // ✅ get login function from context

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, // ✅ use env variable
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       const data = await response.json();
//       if (response.ok) {
//         login(data.token); // ✅ updates context + localStorage instantly
//         setMessage('Login successful!');
//         navigate('/'); // Redirect to home
//       } else {
//         setMessage(data.message || 'Login failed. Please check your credentials.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setMessage('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <main className="flex-1 flex items-center justify-center p-4 min-h-screen">
//       <div
//         className="w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl 
//         bg-black/40 backdrop-blur-lg border border-gray-700 text-white"
//       >
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 font-inter">
//           Login
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block mb-2 font-medium">Email Address</label>
//             <input
//               type="email"
//               className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
//               placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder="Enter your email"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
//               placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="Enter your password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 
//             bg-blue-500 text-white hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//         {message && (
//           <p className="mt-4 text-center text-sm sm:text-base text-gray-300">{message}</p>
//         )}
//       </div>
//     </main>
//   );
// };

// export default Login;import React, { useState } from 'react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js'; // Correct import path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token);
        setMessage('Login successful!');
        navigate('/');
      } else {
        setMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-4 min-h-screen">
      <div
        className="w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl 
        bg-black/40 backdrop-blur-lg border border-gray-700 text-white"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 font-inter">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
              placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
              placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 
            bg-blue-500 text-white hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm sm:text-base text-gray-300">{message}</p>
        )}
      </div>
    </main>
  );
};

export default Login;
