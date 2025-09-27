import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    parcelSendRequest: builder.mutation({
      query: (parcelInfo) => ({
        url: "/parcel",
        method: "POST",
        data: parcelInfo,
      }),
      invalidatesTags: ["PARCEL_SEND"],
    }),
    cancelPendingParcelBySender: builder.mutation({
      query: (parcelId) => ({
        url: `parcel/cancel/${parcelId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL_SEND"],
    }),

    getAllParcelsBySender: builder.query({
      query: (params) => ({
        url: "/parcel",
        method: "GET",
        params,
      }),
      providesTags: ["PARCEL_SEND"],
    }),
  }),
});

export const {
  useParcelSendRequestMutation,
  useCancelPendingParcelBySenderMutation,
  useGetAllParcelsBySenderQuery,

  //   useUserInfoQuery,
} = authApi;
