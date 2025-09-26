import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    parcelSendRequest: builder.mutation({
      query: (parcelInfo) => ({
        url: "/parcel",
        method: "POST",
        data: parcelInfo,
      }),
    }),

    // userInfo: builder.query({
    //   query: () => ({
    //     url: "/user/me",
    //     method: "GET",
    //   }),
    //   providesTags: ["USER"],
    // }),
  }),
});

export const {
  useParcelSendRequestMutation,

  //   useUserInfoQuery,
} = authApi;
