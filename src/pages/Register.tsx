import Logo from "@/assets/icons/Logo";
import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";
import { Link, useSearchParams } from "react-router";
import ParcelLogin from "../assets/images/Parcel-delivery-login.jpg";

const Register = () => {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get("role");
  const preselectedRole =
    roleParam === "sender"
      ? "SENDER"
      : roleParam === "receiver"
        ? "RECEIVER"
        : undefined;

  return (
    <main className="page-enter flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-8 lg:px-16">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2.8rem] border border-border/60 bg-card/90 shadow-2xl lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative hidden lg:block">
          <img
            src={ParcelLogin}
            alt="Parcel delivery"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-secondary/50 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 rounded-2xl border border-white/30 bg-white/60 p-6 text-sm text-white shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              Carrier ready
            </p>
            <p className="text-lg font-semibold">Create your Delivraze account</p>
            <p className="text-white/80">
              Already registered?{" "}
              <Link to="/login" className="font-semibold underline">
                Login
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8 px-6 py-10 sm:px-10">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-foreground">
              <Logo />
              <span className="text-lg font-semibold">Delivraze</span>
            </Link>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground/70">
              Create account
            </p>
            <h1 className="text-3xl font-bold text-foreground">Signup now</h1>
            <p className="text-sm text-muted-foreground">
              Join Delivraze as a sender or receiver to start managing
              deliveries with clarity and confidence.
            </p>
          </div>
          <div className="flex-1">
            <RegisterForm preselectedRole={preselectedRole} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
