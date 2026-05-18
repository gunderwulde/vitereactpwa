import { BrowserRouter, Routes, Route } from 'react-router-dom';
// importaciones SSO eliminadas
import App from './App';
import UploadData from './pages/UploadData';

const MainRoutes = () => (
  <BrowserRouter basename="/vitereactpwa">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/upload" element={<UploadData />} />
    </Routes>
  </BrowserRouter>
);

export default MainRoutes;
