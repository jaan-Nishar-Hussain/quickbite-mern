import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: < Register/>, // Redirect "/" to Login or create a Home Component
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path:'/register',
      element:<Register/>
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
