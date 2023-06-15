import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ user, redirectPath = "/login" }) {
  return <div>{user ? <Outlet /> : <Navigate replace to={redirectPath} />}</div>;
}
