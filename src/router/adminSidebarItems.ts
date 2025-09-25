import Analytics from "@/pages/Admin/Analytics";
import type { ISidebarItems } from "@/types";

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        Component: Analytics,
        url: "/admin/analytics",
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      // {
      //   title: "Add Tour Type",
      //   Component: AddTourType,
      //   url: "/admin/add-tour-type",
      // },
    ],
  },
];
