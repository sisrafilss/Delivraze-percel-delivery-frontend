import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-900 px-4">
      <Card className="w-full max-w-md text-center shadow-lg bg-slate-50 dark:bg-slate-800 rounded-2xl">
        <CardContent className="space-y-6 py-10 px-6">
          <Link to="/" className="flex justify-center">
            <span className="h-12 w-12 text-primary hover:opacity-90 transition">
              <Logo />
            </span>
          </Link>

          <div className="flex justify-center">
            <ShieldAlert className="h-16 w-16 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Unauthorized Access
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              You don’t have permission to view this page. Please log in to
              continue.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <Button
              asChild
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              <Link to="/login">Go to Login</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
