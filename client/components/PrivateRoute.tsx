import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserState } from '../../types';
import { RootState } from '../slices/store';
const PrivateRoute = () => {
  let userData = useSelector((state: RootState) => state.user);
  console.log(`PrivateRoute user: `, userData);
  //<Navigate /> changes current location when it is rendered
  //replace:  replace the current entry in the history stack rather than adding a new entry.
  return userData ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
