import { useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { LogOut, Bell, Search } from "lucide-react";
import { Outlet } from "react-router";
import { AppSidebar } from "../app-sidebar";
import ModeToggler from "./ModeToggler";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function DashboardLayout() {
  const location = useLocation();
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const [searchOpen, setSearchOpen] = useState(false);

  const user = userInfo?.data;

  const getPageTitle = () => {
    const path = location.pathname;
    const segments = path.split("/").filter(Boolean);
    if (segments.length < 2) return "Dashboard";
    const title = segments[1].replace(/-/g, " ");
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const handleLogout = async () => {
    const res = await logout(undefined).unwrap();
    console.log(res);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0 bg-background">
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 animate-fade-in-down">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="-ml-2 hover:scale-110 transition-transform" />
              <Separator
                orientation="vertical"
                className="hidden sm:block h-6"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground animate-fade-in">
                  {getPageTitle()}
                </h1>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
              {searchOpen ? (
                <div className="flex items-center gap-2 animate-fade-in">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="h-9 w-48 md:w-64 animate-fade-in"
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                  />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground relative hover:scale-110 transition-all"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
                <span className="sr-only">Notifications</span>
              </Button>

              <ModeToggler />

              {isLoading ? (
                <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
              ) : user ? (
                <div className="flex items-center gap-3 animate-fade-in-left">
                  <div className="hidden md:flex flex-col text-right">
                    <span className="text-sm font-medium text-foreground">
                      {user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user.role}
                    </span>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm hover:scale-110 transition-transform cursor-pointer">
                    {user.name?.charAt(0) || "U"}
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive hover:scale-110 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Logout</span>
                  </Button>
                </div>
              ) : null}
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6">
            <div className="page-container animate-fade-in-up">
              <Outlet />
            </div>
          </main>

          <footer className="border-t border-border py-4 px-6 animate-fade-in-up animation-delay-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
              <p>&copy; 2024 Delivraze. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <span className="text-xs">Powered by Delivraze</span>
              </div>
            </div>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
