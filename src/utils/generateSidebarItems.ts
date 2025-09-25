import { role } from "@/constants/role";
import { adminSidebarItems } from "@/router/adminSidebarItems";
import { receiverSidebarItems } from "@/router/receiverSidebarItems";
import { senderSidebarItems } from "@/router/senderSidebarItems";

import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.superAdmin:
      return [...adminSidebarItems];
    case role.admin:
      return [...adminSidebarItems];
    case role.sender:
      return [...senderSidebarItems];
    case role.receiver:
      return [...receiverSidebarItems];
    default:
      return [];
  }
};
