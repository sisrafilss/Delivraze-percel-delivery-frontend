import Logo from "@/assets/icons/Logo";
import { LoginForm } from "@/components/modules/Authentication/LoginForm";
import { Link } from "react-router";
import ParcelLogin from "../assets/images/Parcel-delivery-login.jpg";

const Login = () => {
  return (
    <main className="page-enter flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-8 lg:px-16">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2.8rem] border border-border/60 bg-card/90 shadow-2xl shadow-primary/10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-8 px-6 py-10 sm:px-10">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-foreground">
              <Logo />
              <span className="text-lg font-semibold">Delivraze</span>
            </Link>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground/70">
              Secure Sign In
            </p>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Log in to track parcels, manage requests, and access your
              dashboard from anywhere.
            </p>
          </div>
          <div className="flex-1">
            <LoginForm />
          </div>
        </div>

        <div className="relative hidden lg:block">
          <img
            src={ParcelLogin}
            alt="Parcel delivery"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/30 bg-white/60 p-6 text-sm text-white shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              Trusted Delivery
            </p>
            <p className="text-lg font-semibold">On-time and transparent service</p>
            <p className="text-white/80">
              Need an account?{" "}
              <Link to="/register" className="font-semibold underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
