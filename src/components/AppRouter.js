import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Login from '../pages/auth/Login';
import { Restaurants } from '../pages/main/Restaurants';
import config from '../config/config';
import { PageLoader } from './PageLoader';
import { RouterProvider } from 'react-router-dom';

import { useEffect, useState } from 'react';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Restaurants />,
  },
  {
    path: '*',
    element: <Navigate to='/' />,
  },
]);

const AuthRoutes = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <>Logout</>,
  },
  {
    path: '*',
    element: <Navigate to='/login' />,
  },
]);

const LoaderRoute = createBrowserRouter([
  {
    path: '*',
    element: <PageLoader />,
    // element: <AuthenticatedRoutes />,
  },
]);

export const AppRouter = () => {
  const token = Cookies.get('token');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkToken = async () => {
    try {
      const response = await axios.post(
        `${config.url}/cms/auth/check`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      console.log(response.status);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    checkToken().then((res) => {
      setIsAuthenticated(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <RouterProvider router={LoaderRoute} />;
  }

  return <RouterProvider router={isAuthenticated ? Routes : AuthRoutes} />;
};
