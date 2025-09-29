/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/admin.ts
export type UserRole = "ADMIN" | "SENDER" | "RECEIVER" | string;
export type UserActive = "ACTIVE" | "BLOCKED" | "INACTIVE" | string;

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isDeleted?: boolean;
  isActive: UserActive;
  isVerified: boolean;
  auths?: any[];
  createdAt: string;
  updatedAt?: string;
  address?: string;
  phone?: string;
  // password is returned by API in your sample — we will not render it.
  password?: string;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface GetAllUsersResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: User[];
}
