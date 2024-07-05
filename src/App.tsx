// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FormPage from './pages/FormPage';
import SecondPage from './pages/SecondPage';

const App: React.FC = () => {
  const userDetails = localStorage.getItem('userDetails');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/second" element={userDetails ? <SecondPage /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
