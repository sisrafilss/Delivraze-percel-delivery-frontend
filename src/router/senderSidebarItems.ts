// import { Booking } from "@/pages/User/Booking";

import ChangePasswordPage from "@/pages/ChangePassword";
import ProfileAndLogout from "@/pages/ProfileAndLogout";
import AllParcels from "@/pages/Sender/AllParcelsForSender";
import CancelParcelSendRequest from "@/pages/Sender/CancelParcelSendRequest";
import ParcelRequestPage from "@/pages/Sender/ParcelRequestPage";
import SenderAnalytics from "@/pages/Sender/SenderAnalytics";
import TrackParcel from "@/pages/TrackParcel";
import UpdateProfilePage from "@/pages/UpdateProfile";

import type { ISidebarItems } from "@/types";

export const senderSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        Component: SenderAnalytics,
        url: "/sender/analytics",
      },
      {
        title: "Parcel Request",
        Component: ParcelRequestPage,
        url: "/sender/parcel-request",
      },
      {
        title: "Cancel Parcel Request",
        Component: CancelParcelSendRequest,
        url: "/sender/cancel-parcel",
      },
      {
        title: "All Parcels",
        Component: AllParcels,
        url: "/sender/all-parcels",
      },
      {
        title: "Track a Parcel",
        Component: TrackParcel,
        url: "/sender/track-parcel",
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
      },
      {
        title: "Update Profile",
        Component: UpdateProfilePage,
        url: "/sender/update-profile",
      },
      {
        title: "Change Password",
        Component: ChangePasswordPage,
        url: "/sender/change-password",
      },
    ],
  },
];
