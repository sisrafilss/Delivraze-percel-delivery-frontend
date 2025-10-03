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
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>

          <div className="flex items-center gap-4">
            {isLoading ? (
              <span>Loading...</span>
            ) : user ? (
              <div className="flex flex-col text-right">
                <span className="font-semibold text-primary">{user.name}</span>
                <span className="text-sm text-muted-foreground">
                  {user.role}
                </span>
              </div>
            ) : (
              <span className="text-muted-foreground">No user info</span>
            )}
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
