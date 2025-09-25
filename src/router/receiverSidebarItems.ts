// import { Booking } from "@/pages/User/Booking";
import Analytics from "@/pages/Receiver/Analytics";
import type { ISidebarItems } from "@/types";

export const receiverSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        Component: Analytics,
        url: "/reciver/analytics",
      },
    ],
  },
];
