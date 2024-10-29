import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protect";
import RedirectIfLogged from "./redirect";
import Home from "../pages/home";
import SignUp from "@/pages/signup";
import Login from "@/pages/login";
import MyAccount from "@/pages/myAccount";
import Taskboard from "@/pages/taskboard";
import ForgotPassword from "@/pages/forgotPassword";
import ResetPassword from "@/pages/resetPassword";
import RecoverAccount from "@/pages/recoverAccount";
import ActiveAccount from "@/pages/activeAccount";
import NotFound from "@/pages/notFound";

export const router = createBrowserRouter([
  {
    path: '/dozy/',
    element: <Home />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/dozy/taskboard',
    element: <Taskboard />
  },
  {
    path: '/dozy/recoverAccount',
    element: <RecoverAccount />
  },
  {
    path: '/dozy/activeAccount/:recoveryToken',
    element: <ActiveAccount />
  },
  {
    element: <RedirectIfLogged />,
    children: [
      {
        path: '/dozy/signup',
        element: <SignUp />
      },
      {
        path: '/dozy/login',
        element: <Login />
      },
      {
        path: '/dozy/forgotPassword',
        element: <ForgotPassword />
      },
      {
        path: '/dozy/resetPassword/:resetToken',
        element: <ResetPassword />
      },
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dozy/myAccount',
        element: <MyAccount />
      }
    ]
  }

])