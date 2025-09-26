// import { Booking } from "@/pages/User/Booking";

import AllParcels from "@/pages/Sender/AllParcels";
import Analytics from "@/pages/Sender/Analytics";
import PickupRequest from "@/pages/Sender/PickupRequest";
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
        title: "Pickup Request",
        Component: PickupRequest,
        url: "/sender/pickup",
      },
      {
        title: "All Parcels",
        Component: AllParcels,
        url: "/sender/all-parcels",
      },
    ],
  },
];
