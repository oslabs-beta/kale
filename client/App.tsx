import React from 'react';
import './stylesheets/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import WelcomePage from './pages/WelcomePage';
import Dashboard from './pages/Dashboard';
import History from './pages/History';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/history',
    element: <History />,
    errorElement: <NotFoundPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
