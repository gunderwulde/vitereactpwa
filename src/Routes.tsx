import { BrowserRouter, Routes, Route } from 'react-router-dom';
// importaciones SSO eliminadas
import LandingPage from './pages/LandingPage';
import UploadData from './pages/UploadData';
import InitialData from './pages/InitialData';
import GroupSelection from './pages/GroupSelection';

const MainRoutes = () => (
  <BrowserRouter basename="/vitereactpwa">
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/upload" element={<UploadData />} />
      <Route path="/initial-data" element={<InitialData />} />
      <Route path="/group-selection" element={<GroupSelection />} />
    </Routes>
  </BrowserRouter>
);

export default MainRoutes;
