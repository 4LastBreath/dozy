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
    path: '/',
    element: <Home />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/taskboard',
    element: <Taskboard />
  },
  {
    path: '/recoverAccount',
    element: <RecoverAccount />
  },
  {
    path: '/activeAccount/:recoveryToken',
    element: <ActiveAccount />
  },
  {
    element: <RedirectIfLogged />,
    children: [
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: '/forgotPassword',
        element: <ForgotPassword />
      },
      {
        path: '/resetPassword/:resetToken',
        element: <ResetPassword />
      },
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: 'myAccount',
        element: <MyAccount />
      }
    ]
  }

])