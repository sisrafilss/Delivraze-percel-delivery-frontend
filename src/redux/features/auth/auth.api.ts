import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOtp, IVerifyOtp } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    updateProfile: builder.mutation({
      query: (updateInfo) => ({
        url: "/auth/update-profile",
        method: "PATCH",
        data: updateInfo,
      }),
    }),
    changePassword: builder.mutation({
      query: (passwordInfo) => ({
        url: "/auth/change-password",
        method: "POST",
        data: passwordInfo,
      }),
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    forgotPassword: builder.mutation<IResponse<null>, { email: string }>({
      query: (userInfo) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: userInfo,
      }),
    }),
    resetPassword: builder.mutation<
      IResponse<null>,
      { id: string; newPassword: string; token: string }
    >({
      query: ({ id, newPassword, token }) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: { id, newPassword },
        headers: {
          Authorization: token,
        },
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useUserInfoQuery,
} = authApi;
