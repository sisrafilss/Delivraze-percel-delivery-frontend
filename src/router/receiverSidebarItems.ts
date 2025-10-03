import ChangePasswordPage from "@/pages/ChangePassword";
import ProfileAndLogout from "@/pages/ProfileAndLogout";
import AllIncommingParcels from "@/pages/Receiver/AllIncomingParcels";
import AllParcelsByReceiver from "@/pages/Receiver/AllParcelsForReceiver";
import ReceiverAnalytics from "@/pages/Receiver/ReceiverAnalytics";
import TrackParcel from "@/pages/TrackParcel";
import UpdateProfilePage from "@/pages/UpdateProfile";
import type { ISidebarItems } from "@/types";

// Import Lucide icons
import {
  BarChart2,
  Inbox,
  Key,
  Package,
  Search,
  Settings,
  User,
} from "lucide-react";

export const receiverSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        Component: ReceiverAnalytics,
        url: "/receiver/analytics",
        Icon: BarChart2,
      },
      {
        title: "Incomming Parcels",
        Component: AllIncommingParcels,
        url: "/receiver/incomming",
        Icon: Inbox,
      },
      {
        title: "All Parcels",
        Component: AllParcelsByReceiver,
        url: "/receiver/all-parcels",
        Icon: Package,
      },
      {
        title: "Track a Parcel",
        Component: TrackParcel,
        url: "/receiver/track-parcel",
        Icon: Search,
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
        Icon: User,
      },
      {
        title: "Update Profile",
        Component: UpdateProfilePage,
        url: "/receiver/update-profile",
        Icon: Settings,
      },
      {
        title: "Change Password",
        Component: ChangePasswordPage,
        url: "/receiver/change-password",
        Icon: Key,
      },
    ],
  },
];
