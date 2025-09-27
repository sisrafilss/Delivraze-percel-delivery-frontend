// import { Booking } from "@/pages/User/Booking";
import AllIncomingParcels from "@/pages/Receiver/AllIncomingParcels";
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
    ],
  },
];
