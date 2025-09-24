import App from "@/App";
import About from "@/pages/About";
import ForgotPassword from "@/pages/ForgotPassword";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import PasswordResetSuccess from "@/pages/PasswordResetSuccess";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: ForgotPassword,
    path: "/forgot-password",
  },
  {
    Component: ResetPassword,
    path: "/reset-password",
  },
  {
    Component: PasswordResetSuccess,
    path: "/password-reset-success",
  },
]);
