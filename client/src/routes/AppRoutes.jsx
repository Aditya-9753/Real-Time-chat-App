/**
 * @file AppRoutes.jsx
 * @description Top-level routing configuration using React Router DOM.
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/chat" element={<Chat />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/chat" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
