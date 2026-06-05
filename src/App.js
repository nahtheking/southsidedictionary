import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WordResultPage from './pages/WordResultPage';
import ComparePage from './pages/ComparePage';
import RegionPage from './pages/RegionPage';
import ContributePage from './pages/ContributePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/word/:term" element={<WordResultPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/region/:name" element={<RegionPage />} />
        <Route path="/contribute" element={<ContributePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
