// import { Booking } from "@/pages/User/Booking";
import AllIncomingParcels from "@/pages/Receiver/AllIncomingParcels";
import AllParcelsByReceiver from "@/pages/Receiver/AllParcelsForReceiver";
import Analytics from "@/pages/Receiver/Analytics";
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
        Component: AllIncomingParcels,
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
