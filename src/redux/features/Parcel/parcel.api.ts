import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParcelByTrackingId: builder.query({
      query: (trackingId) => ({
        url: `/parcel/public/${trackingId}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),
  }),
});

export const { useGetParcelByTrackingIdQuery } = authApi;
