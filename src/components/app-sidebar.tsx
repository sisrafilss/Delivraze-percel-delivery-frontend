import * as React from "react";

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

  const isActive = (url: string) => {
    return location.pathname === url || location.pathname.startsWith(url + "/");
  };

  return (
    <Sidebar
      {...props}
      className="border-r border-sidebar-border bg-sidebar"
    >
      <SidebarHeader className="border-b border-sidebar-border py-4 animate-fade-in-down">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 hover:scale-105 transition-transform"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground animate-float">
            <span className="text-sm font-bold">D</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-sidebar-foreground">
              Delivraze
            </span>
            <span className="text-xs text-muted-foreground">
              Parcel Dashboard
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3 py-2">
        {data.navMain.map((group, groupIndex) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel 
              className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider animate-fade-in"
              style={{ animationDelay: `${groupIndex * 50}ms` }}
            >
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                        isActive(item.url)
                          ? "bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25"
                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground hover:translate-x-1"
                      }`}
                    >
                      <Link
                        to={item.url}
                        className="flex items-center gap-3 w-full"
                      >
                        {item.Icon && (
                          <item.Icon
                            className={`h-4 w-4 flex-shrink-0 ${
                              isActive(item.url)
                                ? "text-primary-foreground"
                                : ""
                            } ${isActive(item.url) ? "" : "animate-icon-bounce"}`}
                          />
                        )}
                        <span className="text-sm truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail className="hover:bg-primary/5 transition-colors" />
    </Sidebar>
  );
}
