import { BrowserRouter, Routes, Route } from 'react-router-dom';
// importaciones SSO eliminadas
import LandingPage from './pages/LandingPage';
import UploadData from './pages/UploadData';
import InitialData from './pages/InitialData';
import GroupSelection from './pages/GroupSelection';
import HydraulicData from './pages/HydraulicData';
import Temperatures from './pages/Temperatures';
import Vibrations from './pages/Vibrations';
import LeaksLevels from './pages/LeaksLevels';
import Appearance from './pages/Appearance';

const MainRoutes = () => (
  <BrowserRouter basename="/vitereactpwa">
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/upload" element={<UploadData />} />
      <Route path="/initial-data" element={<InitialData />} />
      <Route path="/group-selection" element={<GroupSelection />} />
      <Route path="/hydraulic-data" element={<HydraulicData />} />
      <Route path="/temperatures" element={<Temperatures />} />
      <Route path="/vibrations" element={<Vibrations />} />
      <Route path="/leaks-levels" element={<LeaksLevels />} />
      <Route path="/appearance" element={<Appearance />} />
    </Routes>
  </BrowserRouter>
);

export default MainRoutes;
