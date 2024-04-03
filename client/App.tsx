import React from 'react';
import './stylesheets/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import WelcomePage from './pages/WelcomePage';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import SnapshotPage from './pages/SnapshotPage';
import SignInContainer from './pages/SignIn'; //added
import SignupContainer from './pages/Signup';
import SplashPage from './pages/SplashPage';

const router = createBrowserRouter([
  {
    path: '/welcome',
    element: <WelcomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/',
    element: <SplashPage />,
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
  {
    path: '/history/:snapshotId',
    element: <SnapshotPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/signin',
    element: <SignInContainer />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/signup',
    element: <SignupContainer />,
    errorElement: <NotFoundPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
