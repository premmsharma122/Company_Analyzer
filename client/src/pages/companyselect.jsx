
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js'; // Correct import path

const CompanySelect = () => {
  const [company, setCompany] = useState('');
  const [companyData, setCompanyData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth(); // If you want to use logout here

  // Base URL for backend (empty in local -> proxy will handle, set in Netlify for prod)
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

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
      // 1. Search symbol
      const symbolResponse = await fetch(
        `${API_BASE_URL}/api/search-symbol?q=${encodeURIComponent(company)}`
      );
      if (!symbolResponse.ok) throw new Error('Symbol search failed');
      const symbolData = await symbolResponse.json();

      if (symbolData.data && symbolData.data.length > 0) {
        const symbol = symbolData.data[0].symbol;

        const companyResponse = await fetch(
          `${API_BASE_URL}/api/company/${encodeURIComponent(symbol)}`
        );
        const companyData = await companyResponse.json();

        const newsResponse = await fetch(
          `${API_BASE_URL}/api/news/${encodeURIComponent(company)}`
        );
        const newsData = await newsResponse.json();

        const githubResponse = await fetch(
          `${API_BASE_URL}/api/github/${encodeURIComponent(company)}`
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
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-black/40 backdrop-blur-lg text-white rounded-lg shadow-lg flex items-center space-x-4 border border-gray-600 max-w-lg w-full">
          <span className="truncate">{message}</span>
          <button
            onClick={handleCloseMessage}
            className="text-gray-300 hover:text-white transition-colors"
          >
            ✕
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
