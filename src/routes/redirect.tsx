import { useAuth } from "@/prodivers/auth/authContext";
import { Navigate, Outlet } from "react-router-dom";

const RedirectIfLogged = () => {
  const { user, authLoading } = useAuth()

  if (user._id && !authLoading) {
    return <Navigate to='/dozy/' replace />
  }

  if (!user._id && !authLoading) {
    return <Outlet />
  }
};

export default RedirectIfLogged;