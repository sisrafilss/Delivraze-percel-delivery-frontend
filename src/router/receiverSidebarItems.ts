// import { Booking } from "@/pages/User/Booking";

import Analytics from "@/pages/Receiver/Analytics";

import ChangePasswordPage from "@/pages/ChangePassword";
import ProfileAndLogout from "@/pages/ProfileAndLogout";
import AllIncommingParcels from "@/pages/Receiver/AllIncomingParcels";
import AllParcelsByReceiver from "@/pages/Receiver/AllParcelsForReceiver";
import UpdateProfilePage from "@/pages/UpdateProfile";
import type { ISidebarItems } from "@/types";

export const receiverSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        Component: Analytics,
        url: "/receiver/analytics",
      },
      {
        title: "Incomming Parcels",
        Component: AllIncommingParcels,
        url: "/receiver/incomming",
      },
      {
        title: "All Parcels",
        Component: AllParcelsByReceiver,
        url: "/receiver/all-parcels",
      },
    ],
  },

  {
    title: "My Profile",
    items: [
      {
        title: "My Profile",
        Component: ProfileAndLogout,
        url: "/receiver/my-profile",
      },
      {
        title: "Update Profile",
        Component: UpdateProfilePage,
        url: "/receiver/update-profile",
      },
      {
        title: "Change Password",
        Component: ChangePasswordPage,
        url: "/receiver/change-password",
      },
    ],
  },
];
