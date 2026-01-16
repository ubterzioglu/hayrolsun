import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DreamDetailPage from './pages/DreamDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ruya/:slug" element={<DreamDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

