import AdminAllParcelsPage from "@/pages/Admin/AdminAllParcelsPage";
import AllUsers from "@/pages/Admin/AllUsers";
import Analytics from "@/pages/Admin/Analytics";
import ChangePasswordPage from "@/pages/ChangePassword";
import ProfileAndLogout from "@/pages/ProfileAndLogout";
import UpdateProfilePage from "@/pages/UpdateProfile";
import type { ISidebarItems } from "@/types";

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Manage Parcels",
    items: [
      {
        title: "Analytics",
        Component: Analytics,
        url: "/admin/analytics",
      },
      {
        title: "All Parcels",
        Component: AdminAllParcelsPage,
        url: "/admin/all-parcels",
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
      },
      {
        title: "Update Profile",
        Component: UpdateProfilePage,
        url: "/admin/update-profile",
      },
      {
        title: "Change Password",
        Component: ChangePasswordPage,
        url: "/admin/change-password",
      },
    ],
  },
];
