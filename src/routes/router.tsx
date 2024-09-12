import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import SignUp from "@/pages/signup";
import Login from "@/pages/login";
import MyAccount from "@/pages/myAccount";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'signup',
    element: <SignUp />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'myAccount',
    element: <MyAccount />
  }
])