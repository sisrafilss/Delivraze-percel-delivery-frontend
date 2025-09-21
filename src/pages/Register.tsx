import Logo from "@/assets/icons/Logo";
import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";
import { Link } from "react-router";
import ParcelLogin from "../assets/images/Parcel-delivery-login.jpg";

const Register = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src={ParcelLogin}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[400px]">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
