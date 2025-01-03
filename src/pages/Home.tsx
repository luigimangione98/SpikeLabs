import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const modules = [
    {
      id: 'vertical-jump',
      title: 'Jump Vertical Training',
      description: 'Master the art of explosive jumping with our scientifically-backed vertical jump program. Perfect for spikers and blockers.',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80',
      color: 'from-blue-600 to-blue-900'
    },
    {
      id: 'stretching',
      title: 'Pain Reduction Stretching',
      description: 'Stay injury-free and improve flexibility with our comprehensive stretching routine designed specifically for volleyball players.',
      image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80',
      color: 'from-purple-600 to-purple-900'
    },
    {
      id: 'strength',
      title: 'Volleyball Strength',
      description: 'Build volleyball-specific strength and power with our targeted resistance training program.',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80',
      color: 'from-orange-600 to-orange-900'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1592656094267-764a45160876?w=1600&q=80"
            alt="Volleyball player"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4 text-white">
              Level Up Your Volleyball Game
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Welcome to SpikeLabs: Your Personal Volleyball Training Academy. 
              Transform your game with our professional-grade training programs, 
              designed to take you from amateur to elite player.
            </p>
            <Link
              to="/module/vertical-jump"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#FF8E3C] hover:bg-[#e67d35] transition-colors duration-300"
            >
              Start Training Now
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Training Modules Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12">Training Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((module) => (
            <Link
              key={module.id}
              to={`/module/${module.id}`}
              className="group relative rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={module.image}
                  alt={module.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${module.color} opacity-75`} />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold mb-2">{module.title}</h3>
                  <p className="text-gray-200 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {module.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#FF8E3C] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Progressive Training</h3>
              <p className="text-gray-400">12-week programs designed to gradually improve your skills and strength</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#FF8E3C] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-gray-400">Monitor your improvements with our built-in progress tracking system</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#FF8E3C] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Guidance</h3>
              <p className="text-gray-400">Detailed form tips and common mistake warnings from volleyball professionals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
