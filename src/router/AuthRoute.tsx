import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authContext } from '../context/authContext';

const AuthRoute = () => {
  const { isAuth } = useContext(authContext);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthRoute;
