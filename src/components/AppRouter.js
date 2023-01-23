import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Login from '../pages/auth/Login';
import { Item } from '../pages/main/Items';
import config from '../config/config';
import { PageLoader } from './PageLoader';
import { RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/authActions';
import { Sells } from '../pages/main/Sells';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Item />,
  },
  {
    path: '/sells',
    element: <Sells />,
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
  const dispatch = useDispatch();

  const checkToken = async () => {
    try {
      const response = await axios.post(
        `${config.url}/auth/check`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      console.log(response);
      dispatch(setUser(response.data));
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
