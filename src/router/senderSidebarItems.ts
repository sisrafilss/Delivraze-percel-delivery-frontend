// import { Booking } from "@/pages/User/Booking";

import AllParcels from "@/pages/Sender/AllParcels";
import Analytics from "@/pages/Sender/Analytics";
import ParcelRequestPage from "@/pages/Sender/ParcelRequestPage";

import type { ISidebarItems } from "@/types";

export const senderSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        Component: Analytics,
        url: "/sender/analytics",
      },
      {
        title: "Parcel Request",
        Component: ParcelRequestPage,
        url: "/sender/parcel-request",
      },
      {
        title: "All Parcels",
        Component: AllParcels,
        url: "/sender/all-parcels",
      },
    ],
  },
];
