import Profile from "./pages/profile/Profile";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const ProtectedRoute = ({ children, user, setUser }) => {
  console.log("protectedroute me");
  useEffect(() => {
    if (localStorage.getItem("hello")) {
      setUser("sdgsg");
    } else {
      setUser(null);
    }
  },[]);
  if (user) return <Navigate to="/Profile_page"></Navigate>;
  return children;
};

export default ProtectedRoute;
