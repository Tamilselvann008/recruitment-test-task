import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IPrivateWrapperProps } from '../interface';

const PrivateWrapper:React.FC<IPrivateWrapperProps> = ({ auth }) => {
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper;
