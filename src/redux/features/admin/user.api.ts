import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserByAdmin: builder.mutation({
      query: (userInfo) => ({
        url: `/user/${userInfo.userId}`,
        method: "PATCH",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),

    getAllUsersByAdmin: builder.query({
      query: (params) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const { useGetAllUsersByAdminQuery, useLazyGetAllUsersByAdminQuery } =
  authApi;
