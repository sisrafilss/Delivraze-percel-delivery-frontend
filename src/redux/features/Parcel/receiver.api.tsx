import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    markAsDelivered: builder.mutation({
      query: (parcelInfo) => ({
        url: "/parcel/receiver/update-status",
        method: "PATCH",
        data: parcelInfo,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    getAllIncommingParcelsByReceiver: builder.query({
      query: () => ({
        url: "/parcel/receiver/incomming",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useMarkAsDeliveredMutation,
  useGetAllIncommingParcelsByReceiverQuery,
} = authApi;
