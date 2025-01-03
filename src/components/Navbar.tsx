import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isModulesOpen, setIsModulesOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-[#FF8E3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-2xl font-bold text-[#FF8E3C]">SpikeLabs</span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() => setIsModulesOpen(!isModulesOpen)}
                className="flex items-center hover:text-[#FF8E3C] transition-colors text-gray-300"
              >
                Modules
                <svg 
                  className={`ml-1 h-5 w-5 transform transition-transform ${isModulesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isModulesOpen && (
                <div className="absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <Link
                      to="/module/vertical-jump"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-[#FF8E3C]"
                      onClick={() => setIsModulesOpen(false)}
                    >
                      Jump Training
                    </Link>
                    <Link
                      to="/module/stretching"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-[#FF8E3C]"
                      onClick={() => setIsModulesOpen(false)}
                    >
                      Stretching
                    </Link>
                    <Link
                      to="/module/strength"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-[#FF8E3C]"
                      onClick={() => setIsModulesOpen(false)}
                    >
                      Strength
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/progress"
              className={`hover:text-[#FF8E3C] transition-colors ${
                location.pathname === '/progress' ? 'text-[#FF8E3C]' : 'text-gray-300'
              }`}
            >
              Progress
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
