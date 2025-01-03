import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TrainingModule from './pages/TrainingModule';
import Progress from './pages/Progress';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/module/:moduleId" element={<TrainingModule />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
