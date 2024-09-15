import Loading from "@/pages/loading";
import { useAuth } from "@/prodivers/auth/authContext";
import { Navigate, Outlet } from "react-router-dom";

const RedirectIfLogged = () => {
  const { user, authLoading } = useAuth()

  if (authLoading) {
    return <Loading />
  }

  if (user._id && !authLoading) {
    return <Navigate to='/' replace />
  }

  if (!user._id && !authLoading) {
    return <Outlet />
  }
};

export default RedirectIfLogged;