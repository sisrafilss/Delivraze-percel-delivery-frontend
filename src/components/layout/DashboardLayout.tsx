import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Outlet } from "react-router";
import { AppSidebar } from "../app-sidebar";

export default function DashboardLayout() {
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);

  const user = userInfo?.data;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-full flex-1 flex-col gap-4 p-4">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-2 border-b border-muted bg-background/80 px-4 backdrop-blur">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>

            <div className="flex items-center gap-4">
              {isLoading ? (
                <span className="text-muted-foreground">Loading…</span>
              ) : user ? (
                <div className="flex flex-col text-right">
                  <span className="font-semibold text-primary">{user.name}</span>
                  <span className="text-sm text-muted-foreground">{user.role}</span>
                </div>
              ) : (
                <span className="text-muted-foreground">No user info</span>
              )}
            </div>
          </header>

          <div className="flex-1 overflow-hidden">
            <div className="dashboard-shell relative h-full">
              <div className="surface-glow absolute -right-8 -top-8 h-48 w-48 rounded-full bg-secondary/40 blur-3xl" />
              <div className="surface-glow absolute -left-6 -bottom-8 h-40 w-40 rounded-full bg-primary/40 blur-3xl" />
              <div className="dashboard-panel relative flex h-full flex-col overflow-hidden">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
