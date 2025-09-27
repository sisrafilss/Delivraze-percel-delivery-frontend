import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { LogOut } from "lucide-react";
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
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner size="lg" />
      </div>
    );
  }

  const user = userInfo?.data;

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-md">
          <CardHeader className="flex flex-col items-center gap-3">
            <Avatar className="h-20 w-20">
              {/* In case you add profile pictures later, you can pass user.image */}
              <AvatarImage src={user?.image} alt={user?.name} />
              <AvatarFallback className="text-lg font-bold">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl font-semibold text-primary">
              {user?.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </CardHeader>

          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-medium">{user?.role}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{user?.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{user?.address}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-medium">{user?.isActive}</p>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="flex items-center gap-2"
                disabled={isLoggingOut}
              >
                {isLoggingOut && <Spinner size="sm" />}
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
