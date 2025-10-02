import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserByAdmin: builder.mutation({
      query: ({ userId, userInfo }) => {
        console.log("inside user api by admin:", userId, userInfo);

        return {
          url: `/user/${userId}`,
          method: "PATCH",
          data: userInfo,
        };
      },
      invalidatesTags: ["USER"],
    }),

    getAllUsersByAdmin: builder.query({
      query: (params) => ({
        url: "/user/all-users?isDeleted=false",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const { useGetAllUsersByAdminQuery, useUpdateUserByAdminMutation } =
  authApi;
