import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

const PasswordResetSuccess: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-semibold">
            Password Reset Successful
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 text-sm sm:text-base">
            Your password has been successfully updated. You can now log in
            using your new password.
          </p>
        </CardContent>

        <CardFooter>
          <Button asChild className="w-full">
            <Link to="/login">Go to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PasswordResetSuccess;
