import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-black/80 backdrop-blur-sm text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left Section */}
        <p className="text-sm text-center sm:text-left">
          &copy; {new Date().getFullYear()} JB_Finder. All rights reserved. Devloped by Prem Sharma.
        </p>

        {/* Right Section */}
        <div className="flex space-x-6 text-sm">
          <a href="" className="hover:text-white transition-colors">About</a>
          <a href="" className="hover:text-white transition-colors">Privacy</a>
          <a href="" className="hover:text-white transition-colors">Terms</a>
          <a href="" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
