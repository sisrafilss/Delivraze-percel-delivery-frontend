import ChangePasswordPage from "@/pages/ChangePassword";
import ProfileAndLogout from "@/pages/ProfileAndLogout";
import AllParcels from "@/pages/Sender/AllParcelsForSender";
import CancelParcelSendRequest from "@/pages/Sender/CancelParcelSendRequest";
import ParcelRequestPage from "@/pages/Sender/ParcelRequestPage";
import SenderAnalytics from "@/pages/Sender/SenderAnalytics";
import TrackParcel from "@/pages/TrackParcel";
import UpdateProfilePage from "@/pages/UpdateProfile";
import type { ISidebarItems } from "@/types";

// Import Lucide icons
import {
  BarChart2,
  Clock,
  Key,
  Package,
  Search,
  Settings,
  User,
} from "lucide-react";

export const senderSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        Component: SenderAnalytics,
        url: "/sender/analytics",
        Icon: BarChart2,
      },
      {
        title: "Parcel Request",
        Component: ParcelRequestPage,
        url: "/sender/parcel-request",
        Icon: Package,
      },
      {
        title: "Cancel Parcel Request",
        Component: CancelParcelSendRequest,
        url: "/sender/cancel-parcel",
        Icon: Clock,
      },
      {
        title: "All Parcels",
        Component: AllParcels,
        url: "/sender/all-parcels",
        Icon: Package,
      },
      {
        title: "Track a Parcel",
        Component: TrackParcel,
        url: "/sender/track-parcel",
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
        url: "/sender/my-profile",
        Icon: User,
      },
      {
        title: "Update Profile",
        Component: UpdateProfilePage,
        url: "/sender/update-profile",
        Icon: Settings,
      },
      {
        title: "Change Password",
        Component: ChangePasswordPage,
        url: "/sender/change-password",
        Icon: Key,
      },
    ],
  },
];
