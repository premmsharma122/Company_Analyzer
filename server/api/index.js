// server/api/index.js
import app from '../server.js';

// Vercel requires a function handler export
export default (req, res) => {
  return app(req, res);
};
