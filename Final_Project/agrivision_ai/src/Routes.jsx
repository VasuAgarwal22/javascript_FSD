import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Login from './pages/login';
import SensorDataDashboard from './pages/sensor-data-dashboard';
import Dashboard from './pages/dashboard';
import SpectralAnalysisMaps from './pages/spectral-analysis-maps';
import ImageUploadAnalysis from './pages/image-upload-analysis';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sensor-data-dashboard" element={<SensorDataDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/spectral-analysis-maps" element={<SpectralAnalysisMaps />} />
        <Route path="/image-upload-analysis" element={<ImageUploadAnalysis />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
