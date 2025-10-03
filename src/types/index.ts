import type { LucideProps } from "lucide-react";
import type {
  ComponentType,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export type {
  GetAllUsersResponse,
  Meta,
  User,
  UserActive,
  UserRole,
} from "./admin";
export type { ILogin, ISendOtp, IVerifyOtp } from "./auth.type";
export type { Parcel } from "./parcel.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    Component: ComponentType;
    url: string;
    Icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "SENDER" | "RECEIVER";
