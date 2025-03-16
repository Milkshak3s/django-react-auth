import React from "react";
import type { JSX } from "react";
import { Navigate, Route, RouteProps } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useSelector((state: RootState) => state.auth);

  return auth.account ? children : <Navigate to={"/login"} />;
};


export default ProtectedRoute;
