import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    parcelSendRequest: builder.mutation({
      query: (parcelInfo) => ({
        url: "/parcel",
        method: "POST",
        data: parcelInfo,
      }),
      invalidatesTags: ["PARCEL"],
    }),
    cancelPendingParcelBySender: builder.mutation({
      query: (parcelId) => ({
        url: `parcel/cancel/${parcelId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    getAllParcelsBySender: builder.query({
      query: (params) => ({
        url: "/parcel",
        method: "GET",
        params,
      }),
      providesTags: ["PARCEL"],
    }),
    getSenderStats: builder.query({
      query: () => ({
        url: "/stats/sender",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useParcelSendRequestMutation,
  useCancelPendingParcelBySenderMutation,
  useGetAllParcelsBySenderQuery,
  useGetSenderStatsQuery,

  //   useUserInfoQuery,
} = authApi;
