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
    <div className="page-enter grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src={ParcelLogin}
          alt="Image"
          className="image-enter absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div>
      <div className="section-enter flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[400px]">
            <RegisterForm preselectedRole={preselectedRole} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
