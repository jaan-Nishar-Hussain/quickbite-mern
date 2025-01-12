import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import Resturant from './pages/resturant';
import Menu from './pages/menu';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/register', element: <Register /> },
    { path: '/resturant', element: <Resturant /> },
    { path: '/menu', element: <Menu /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
