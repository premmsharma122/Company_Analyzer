import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
 
// Fetch stock symbol for a company from Twelve Data
router.get('/search-symbol', async (req, res) => {
  try {
    const TWELVE_DATA_API_KEY = process.env.TWELVE_DATA_API_KEY;
    if (!TWELVE_DATA_API_KEY) {
        return res.status(500).json({ message: 'Twelve Data API key is not configured.' });
    }
    const { q } = req.query;
    const response = await fetch(`https://api.twelvedata.com/symbol_search?symbol=${q}&source=docs&apikey=${TWELVE_DATA_API_KEY}`);
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Twelve Data Symbol Search failed with:', response.status, errorText);
        return res.status(response.status).json({ message: 'Error searching for symbol.' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Twelve Data Symbol Search Error:', error);
    res.status(500).json({ message: 'Error searching for symbol' });
  }
});

// Fetch company financial data from Twelve Data
router.get('/company/:symbol', async (req, res) => {
  try {
    const TWELVE_DATA_API_KEY = process.env.TWELVE_DATA_API_KEY;
    if (!TWELVE_DATA_API_KEY) {
        return res.status(500).json({ message: 'Twelve Data API key is not configured.' });
    }
    const { symbol } = req.params;
    const response = await fetch(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`);
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Twelve Data API failed with:', response.status, errorText);
        return res.status(response.status).json({ message: 'Error fetching financial data from Twelve Data.' });
    }

    const data = await response.json();
    // Twelve Data returns an error object if a symbol is not found.
    if (data.status === 'error') {
        return res.status(404).json({ message: data.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Twelve Data API Error:', error);
    res.status(500).json({ message: 'Error fetching company data' });
  }
});

// Fetch news from News API
router.get('/news/:query', async (req, res) => {
  try {
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    if (!NEWS_API_KEY) {
        return res.status(500).json({ message: 'News API key is not configured.' });
    }
    const { query } = req.params;
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('News API failed with:', response.status, errorText);
      return res.status(response.status).json({ message: 'Error fetching news from News API.' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('News API Error:', error);
    res.status(500).json({ message: 'Error fetching news' });
  }
});

// Fetch GitHub project data
router.get('/github/:owner', async (req, res) => {
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    if (!GITHUB_TOKEN) {
        return res.status(500).json({ message: 'GitHub Token is not configured.' });
    }
    const { owner } = req.params;
    const response = await fetch(`https://api.github.com/users/${owner}/repos`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API failed with:', response.status, errorText);
      return res.status(response.status).json({ message: 'Error fetching GitHub data.' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('GitHub API Error:', error);
    res.status(500).json({ message: 'Error fetching GitHub data' });
  }
});

export default router;
