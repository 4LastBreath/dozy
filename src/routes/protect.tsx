import { useAuth } from "@/prodivers/auth/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, authLoading } = useAuth()

  if (!user._id && !authLoading) {
    return <Navigate to='/dozy/login' replace />
  }

  if (user._id && !authLoading) {
    return <Outlet />
  }
};

export default ProtectedRoute;