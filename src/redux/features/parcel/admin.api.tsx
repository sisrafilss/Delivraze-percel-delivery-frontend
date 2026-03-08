import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateParcelByAdmin: builder.mutation({
      query: (parcelInfo) => ({
        url: `/parcel/update/${parcelInfo.parcelId}`,
        method: "PATCH",
        data: parcelInfo,
      }),
      invalidatesTags: ["PARCEL"],
    }),
    deleteParcelByAdmin: builder.mutation({
      query: (parcelId) => ({
        url: `/parcel/delete/${parcelId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    getAllParcelsByAdmin: builder.query({
      query: (params) => ({
        url: "/parcel/all",
        method: "GET",
        params,
      }),
      providesTags: ["PARCEL"],
    }),
    getAdminStats: builder.query({
      query: () => ({
        url: "/stats/admin",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdateParcelByAdminMutation,
  useGetAllParcelsByAdminQuery,
  useDeleteParcelByAdminMutation,
  useGetAdminStatsQuery,
} = authApi;
