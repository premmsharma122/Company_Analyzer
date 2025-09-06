import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedOption) {
      console.log(`User is looking for a: ${selectedOption}`);
      navigate('/company-select'); // Use React Router for navigation
    } else {
      setMessage('Please select either "Job" or "Internship" to proceed.');
    }
  };

  const handleCloseMessage = () => {
    setMessage('');
  };

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      {message && (
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 
          p-3 sm:p-4 bg-black/40 backdrop-blur-lg text-white rounded-lg shadow-lg 
          flex items-center space-x-2 sm:space-x-4 border border-gray-600 text-sm sm:text-base"
        >
          <span>{message}</span>
          <button
            onClick={handleCloseMessage}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <div
        className="w-full max-w-2xl p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl 
        bg-black/40 backdrop-blur-lg border border-gray-700 text-center"
      >
        <h1
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6 
          leading-snug sm:leading-tight font-inter"
        >
          We're here to link success with you. <br />
          <span className="text-blue-400">Explore with us.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium text-white mb-6 sm:mb-8 font-inter">
          What are you looking for?
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4 mb-6 sm:mb-8">
          <button
            onClick={() => setSelectedOption('Job')}
            className={`flex-1 max-w-[200px] py-3 sm:py-4 px-6 rounded-full font-semibold text-base sm:text-lg transition-colors duration-300 transform ${
              selectedOption === 'Job'
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Job
          </button>
          <button
            onClick={() => setSelectedOption('Internship')}
            className={`flex-1 max-w-[200px] py-3 sm:py-4 px-6 rounded-full font-semibold text-base sm:text-lg transition-colors duration-300 transform ${
              selectedOption === 'Internship'
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Internship
          </button>
        </div>
        <button
          onClick={handleNext}
          className={`w-full md:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 ${
            selectedOption
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
          }`}
        >
          Next -&gt;
        </button>
      </div>
    </main>
  );
};

export default Home;
