import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const Home = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <main className="flex-grow flex items-center justify-center p-4 text-center">
      <div className="w-full max-w-4xl p-6 sm:p-10 bg-white/80 rounded-xl shadow-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Welcome to JB_Finder!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Discover key insights about your favorite companies and startups. Track financial data, latest news, and GitHub activity all in one place.
        </p>
        {!isAuthenticated ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login"
              className="px-8 py-4 text-lg rounded-full font-bold transition-all duration-300 transform hover:scale-105 
              bg-blue-600 text-white shadow-lg"
            >
              Log In
            </Link>
            <Link 
              to="/signup"
              className="px-8 py-4 text-lg rounded-full font-bold transition-all duration-300 transform hover:scale-105 
              bg-gray-200 text-gray-800 shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <Link 
            to="/company-select"
            className="px-8 py-4 text-lg rounded-full font-bold transition-all duration-300 transform hover:scale-105 
            bg-purple-600 text-white shadow-lg"
          >
            Start Tracking
          </Link>
        )}
      </div>
    </main>
  );
};

export default Home;