// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleRegularSignup = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     try {
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: 'Server error' }));
//         setMessage(errorData.message || 'Registration failed. Please try again.');
//         return;
//       }

//       const data = await response.json();
//       localStorage.setItem('token', data.token); // Store token on successful registration
//       setMessage('Registration successful! Redirecting...');
//       navigate('/'); // Redirect to the home page after a successful signup
//     } catch (error) {
//       console.error('Signup error:', error);
//       setMessage('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <main className="flex-1 flex items-center justify-center p-4 min-h-screen">
//       <div
//         className="w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl 
//           bg-black/40 backdrop-blur-lg border border-gray-700 text-white"
//       >
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 font-inter">
//           Sign Up
//         </h2>
//         <form onSubmit={handleRegularSignup} className="space-y-6">
//           <div>
//             <label className="block mb-2 font-medium">Name</label>
//             <input
//               type="text"
//               className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
//                 placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               placeholder="Enter your name"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">Email Address</label>
//             <input
//               type="email"
//               className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
//                 placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
//                 placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="Enter your password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 
//               bg-blue-500 text-white hover:bg-blue-600"
//           >
//             Sign Up
//           </button>
//         </form>
//         {message && (
//           <p className="mt-4 text-center text-sm sm:text-base text-red-400">{message}</p>
//         )}
//       </div>
//     </main>
//   );
// };

// export default Signup;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App'; // ✅ get auth context (same as Login)

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ so token saves properly

  const handleRegularSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, // ✅ use backend env
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error' }));
        setMessage(errorData.message || 'Registration failed. Please try again.');
        return;
      }

      const data = await response.json();
      login(data.token); // ✅ store token in context + localStorage
      setMessage('Registration successful! Redirecting...');
      navigate('/'); // redirect home
    } catch (error) {
      console.error('Signup error:', error);
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
          Sign Up
        </h2>
        <form onSubmit={handleRegularSignup} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
                placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
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
            Sign Up
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm sm:text-base text-red-400">{message}</p>
        )}
      </div>
    </main>
  );
};

export default Signup;
