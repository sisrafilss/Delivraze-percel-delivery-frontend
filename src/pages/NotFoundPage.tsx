import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-charcoal text-center px-4">
      <Card className="max-w-lg w-full shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <CardContent className="flex flex-col items-center gap-6 py-10">
          {/* Icon */}
          <AlertTriangle className="h-16 w-16 text-[#FB923C]" />

          {/* Error Text */}
          <h1 className="text-4xl font-bold text-[#6D28D9] dark:text-[#FB923C]">
            404 - Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Oops! The page you are looking for doesn’t exist or has been moved.
          </p>

          {/* Go Back Button */}
          <Link to="/" className="w-full sm:w-auto">
            <Button className="bg-[#6D28D9] hover:bg-[#5a21b8] text-white font-medium px-6 py-2 rounded-xl shadow-md transition-colors">
              Go Back Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
