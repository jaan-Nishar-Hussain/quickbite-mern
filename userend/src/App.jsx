import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Cart from './pages/cart';

const ErrorBoundary = ({ error }) => {
  return (
    <div>
      <h1>Error:</h1>
      <p>{error.message || 'Something went wrong!'}</p>
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/register" />,  // Use Navigate to redirect to /login
    },
    {
      path: '/login',
      element: <Login />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/register',
      element: <Register />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/cart',
      element: <Cart />,
      errorElement: <ErrorBoundary />,
    },
  ]);

  console.log('Router Setup:', router); // Debugging log

  return (
    <div>
      
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
