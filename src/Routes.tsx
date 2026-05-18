import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// importaciones SSO eliminadas
import App from './App';

const MainRoutes = () => (
  <BrowserRouter basename="/vitereactpwa">
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);

export default MainRoutes;
