import AdminAllParcelsPage from "@/pages/Admin/AdminAllParcelsPage";
import Analytics from "@/pages/Admin/AdminAnalytics";
import AllUsers from "@/pages/Admin/AllUsers";
import ChangePasswordPage from "@/pages/ChangePassword";
import ProfileAndLogout from "@/pages/ProfileAndLogout";
import TrackParcel from "@/pages/TrackParcel";
import UpdateProfilePage from "@/pages/UpdateProfile";
import type { ISidebarItems } from "@/types";

// Import Lucide icons
import {
  BarChart2,
  Key,
  Package,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Manage Parcels",
    items: [
      {
        title: "Analytics",
        Component: Analytics,
        url: "/admin/analytics",
        Icon: BarChart2,
      },
      {
        title: "All Parcels",
        Component: AdminAllParcelsPage,
        url: "/admin/all-parcels",
        Icon: Package,
      },
      {
        title: "Track a Parcel",
        Component: TrackParcel,
        url: "/admin/track-parcel",
        Icon: Search,
      },
    ],
  },
  {
    title: "Manage Users",
    items: [
      {
        title: "All Users",
        Component: AllUsers,
        url: "/admin/users",
        Icon: Users,
      },
    ],
  },
  {
    title: "My Profile",
    items: [
      {
        title: "Profile & Logout",
        Component: ProfileAndLogout,
        url: "/admin/my-profile",
        Icon: User,
      },
      {
        title: "Update Profile",
        Component: UpdateProfilePage,
        url: "/admin/update-profile",
        Icon: Settings,
      },
      {
        title: "Change Password",
        Component: ChangePasswordPage,
        url: "/admin/change-password",
        Icon: Key,
      },
    ],
  },
];
