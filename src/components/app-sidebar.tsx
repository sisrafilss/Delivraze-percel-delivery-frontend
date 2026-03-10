import * as React from "react";

import Logo from "@/assets/icons/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { getSidebarItems } from "@/utils/generateSidebarItems";
import { Link, useLocation } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { data: userInfo } = useUserInfoQuery(undefined);

  const data = {
    navMain: getSidebarItems(userInfo?.data?.role),
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="space-y-2 border-b border-border/30 pb-4">
        <Link to="/" className="flex items-center gap-3 text-foreground">
          <Logo />
          <span className="text-lg font-semibold">Delivraze</span>
        </Link>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
          Parcel Dashboard
        </p>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url} className="flex items-center gap-2">
                        {/* Render the icon if provided */}
                        {item.Icon && <item.Icon className="w-4 h-4" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
