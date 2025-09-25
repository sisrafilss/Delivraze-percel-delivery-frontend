import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import { default as AdminAnalytics } from "@/pages/Admin/Analytics";
import Contact from "@/pages/Contact";
import ForgotPassword from "@/pages/ForgotPassword";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import PasswordResetSuccess from "@/pages/PasswordResetSuccess";
import { default as ReceiverAnalytics } from "@/pages/Receiver/Analytics";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import { default as SenderAnalytics } from "@/pages/Sender/Analytics";
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
      {
        Component: Contact,
        path: "contact",
      },
    ],
  },

  {
    Component: DashboardLayout,
    path: "/admin",
    children: [
      {
        Component: AdminAnalytics,
        index: true,
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/sender",
    children: [
      {
        Component: SenderAnalytics,
        index: true,
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/receiver",
    children: [
      {
        Component: ReceiverAnalytics,
        index: true,
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
