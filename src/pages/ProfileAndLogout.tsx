import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { LogOut, User, Mail, Phone, MapPin, Shield } from "lucide-react";
import { useNavigate } from "react-router";

export default function ProfileAndLogout() {
  const navigate = useNavigate();
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="card-animated">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
              <div className="w-full space-y-4 mt-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const user = userInfo?.data;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          My Profile
        </h1>
        <p className="text-muted-foreground mt-1">
          View and manage your account information
        </p>
      </div>

      <Card className="card-animated card-glow hover-lift">
        <CardHeader className="pb-4">
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-primary/20 animate-float">
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-green-500 border-4 border-background flex items-center justify-center animate-pulse-soft">
                <Shield className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="text-center">
              <CardTitle className="text-xl font-bold animate-fade-in animation-delay-100">
                {user?.name}
              </CardTitle>
              <p className="text-muted-foreground text-sm animate-fade-in animation-delay-200">
                {user?.email}
              </p>
              <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in animation-delay-300">
                <Shield className="h-3 w-3" />
                {user?.role}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-fade-in-left animation-delay-100">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                <User className="h-5 w-5 text-primary animate-icon-bounce" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium">{user?.name || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-fade-in-left animation-delay-200">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                <Mail className="h-5 w-5 text-primary animate-icon-bounce" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email Address</p>
                <p className="font-medium">{user?.email || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-fade-in-left animation-delay-300">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                <Phone className="h-5 w-5 text-primary animate-icon-bounce" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone Number</p>
                <p className="font-medium">{user?.phone || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-fade-in-left animation-delay-400">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                <MapPin className="h-5 w-5 text-primary animate-icon-bounce" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="font-medium">{user?.address || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border animate-fade-in-up animation-delay-500">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full gap-2 hover:scale-[1.02] transition-transform"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
