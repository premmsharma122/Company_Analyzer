// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleNext = () => {
//     if (selectedOption) {
//       console.log(`User is looking for a: ${selectedOption}`);
//       navigate('/company-select'); // Use React Router for navigation
//     } else {
//       setMessage('Please select either "Job" or "Internship" to proceed.');
//     }
//   };

//   const handleCloseMessage = () => {
//     setMessage('');
//   };

//   return (
//     <main className="flex-1 flex items-center justify-center p-4">
//       {message && (
//         <div
//           className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 
//           p-3 sm:p-4 bg-black/40 backdrop-blur-lg text-white rounded-lg shadow-lg 
//           flex items-center space-x-2 sm:space-x-4 border border-gray-600 text-sm sm:text-base"
//         >
//           <span>{message}</span>
//           <button
//             onClick={handleCloseMessage}
//             className="text-gray-300 hover:text-white transition-colors"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-5 h-5 sm:w-6 sm:h-6"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//       )}
//       <div
//         className="w-full max-w-2xl p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl 
//         bg-black/40 backdrop-blur-lg border border-gray-700 text-center"
//       >
//         <h1
//           className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6 
//           leading-snug sm:leading-tight font-inter"
//         >
//           We're here to link success with you. <br />
//           <span className="text-blue-400">Explore with us.</span>
//         </h1>
//         <p className="text-base sm:text-lg md:text-xl font-medium text-white mb-6 sm:mb-8 font-inter">
//           What are you looking for?
//         </p>
//         <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4 mb-6 sm:mb-8">
//           <button
//             onClick={() => setSelectedOption('Job')}
//             className={`flex-1 max-w-[200px] py-3 sm:py-4 px-6 rounded-full font-semibold text-base sm:text-lg transition-colors duration-300 transform ${
//               selectedOption === 'Job'
//                 ? 'bg-blue-600 text-white shadow-lg scale-105'
//                 : 'bg-white/20 text-white hover:bg-white/30'
//             }`}
//           >
//             Job
//           </button>
//           <button
//             onClick={() => setSelectedOption('Internship')}
//             className={`flex-1 max-w-[200px] py-3 sm:py-4 px-6 rounded-full font-semibold text-base sm:text-lg transition-colors duration-300 transform ${
//               selectedOption === 'Internship'
//                 ? 'bg-blue-600 text-white shadow-lg scale-105'
//                 : 'bg-white/20 text-white hover:bg-white/30'
//             }`}
//           >
//             Internship
//           </button>
//         </div>
//         <button
//           onClick={handleNext}
//           className={`w-full md:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 ${
//             selectedOption
//               ? 'bg-blue-500 text-white hover:bg-blue-600'
//               : 'bg-gray-500 text-gray-300 cursor-not-allowed'
//           }`}
//         >
//           Next -&gt;
//         </button>
//       </div>
//     </main>
//   );
// };

// export default Home;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanySelect = () => {
  const [company, setCompany] = useState('');
  const [companyData, setCompanyData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL; // ✅ load backend from env

  const handleTrack = async () => {
    if (!company.trim()) {
      setMessage("Please enter a company or startup name!");
      return;
    }

    setLoading(true);
    setCompanyData(null);
    setNewsData(null);
    setGithubData(null);

    try {
      // ✅ API calls with backendUrl
      const symbolResponse = await fetch(
        `${backendUrl}/api/search-symbol?q=${encodeURIComponent(company)}`
      );
      if (!symbolResponse.ok) {
        throw new Error('Symbol search failed');
      }
      const symbolData = await symbolResponse.json();

      if (symbolData.data && symbolData.data.length > 0) {
        const symbol = symbolData.data[0].symbol;

        const companyResponse = await fetch(
          `${backendUrl}/api/company/${encodeURIComponent(symbol)}`
        );
        const companyData = await companyResponse.json();

        const newsResponse = await fetch(
          `${backendUrl}/api/news/${encodeURIComponent(company)}`
        );
        const newsData = await newsResponse.json();

        const githubResponse = await fetch(
          `${backendUrl}/api/github/${encodeURIComponent(company)}`
        );
        const githubData = await githubResponse.json();

        setCompanyData(companyData);
        setNewsData(newsData);
        setGithubData(githubData);

        setMessage(`Successfully fetched data for ${company}.`);
      } else {
        setMessage(`Could not find a stock symbol for "${company}".`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage(`An error occurred while fetching data for "${company}".`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseMessage = () => {
    setMessage('');
  };

  return (
    <main className="flex-grow flex items-center justify-center p-4">
      {message && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-black/40 backdrop-blur-lg text-white rounded-lg shadow-lg flex items-center space-x-4 border border-gray-600">
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
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="w-full max-w-7xl flex flex-col items-center justify-center bg-white/80 rounded-xl p-6 sm:p-10">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 text-gray-800 hover:text-gray-600 transition-colors"
        >
          &larr; Back
        </button>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
          Find Your Company / Startup
        </h1>

        <input
          type="text"
          placeholder="Enter company or startup..."
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full max-w-md p-4 mb-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all"
        />

        <button
          onClick={handleTrack}
          className="w-full max-w-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transform transition-all"
        >
          {loading ? 'Searching...' : 'Track'}
        </button>

        {/* Responsive 3-block grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {companyData && companyData.symbol && (
            <div className="p-6 bg-white rounded-lg shadow-md w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{companyData.name}</h2>
              <p><strong>Symbol:</strong> {companyData.symbol}</p>
              <p><strong>Currency:</strong> {companyData.currency}</p>
              <p><strong>Exchange:</strong> {companyData.exchange}</p>
            </div>
          )}

          {newsData && newsData.articles && newsData.articles.length > 0 && (
            <div className="p-6 bg-white rounded-lg shadow-md w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Latest News</h3>
              {newsData.articles.slice(0, 3).map((article, index) => (
                <div key={index} className="mb-4">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {article.title}
                  </a>
                  <p className="text-gray-600 text-sm">{article.description}</p>
                </div>
              ))}
            </div>
          )}

          {githubData && githubData.length > 0 && (
            <div className="p-6 bg-white rounded-lg shadow-md w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Top GitHub Repositories</h3>
              {githubData.slice(0, 3).map((repo, index) => (
                <div key={index} className="mb-4">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {repo.name}
                  </a>
                  <p className="text-gray-600 text-sm">
                    {repo.description || 'No description available.'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CompanySelect;
