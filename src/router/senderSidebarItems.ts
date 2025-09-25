// import { Booking } from "@/pages/User/Booking";

import Analytics from "@/pages/Sender/Analytics";
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
    ],
  },
];
