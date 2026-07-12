/**
 * @file App.jsx
 * @description Root application component.
 * Sets up all top-level context providers and the router.
 */

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      {/*
       * Provider Hierarchy:
       * AuthProvider → SocketProvider (needs auth) → Routes (needs both)
       */}
      <AuthProvider>
        <SocketProvider>
          <AppRoutes />
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
