// import { Booking } from "@/pages/User/Booking";

import Analytics from "@/pages/Receiver/Analytics";

import AllIncommingParcels from "@/pages/Receiver/AllIncomingParcels";
import AllParcelsByReceiver from "@/pages/Receiver/AllParcelsForReceiver";
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
];
