import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected_Route = ({ isLogin }) => {
  return isLogin ? <Outlet /> : <Navigate to={"/login"} />;
};

export default Protected_Route;
