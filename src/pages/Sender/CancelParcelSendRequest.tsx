/* eslint-disable @typescript-eslint/no-explicit-any */
import AskConfirmation from "@/components/AskConfirmation";
import ParcelDetailModal from "@/components/modules/Parcels/ParcelDetailModal";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCancelPendingParcelBySenderMutation,
  useGetAllParcelsBySenderQuery,
} from "@/redux/features/parcel/sender.api";
import type { Parcel } from "@/types";
import { format } from "date-fns";
import { useMemo, useState } from "react";

export default function CancelParcelSendRequest() {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
    }),
    [page, limit]
  );

  const { data, isLoading, isError } = useGetAllParcelsBySenderQuery({
    status: "PENDING",
    ...queryParams,
  });

  const [cancelPendingParcelBySender] =
    useCancelPendingParcelBySenderMutation();

  const parcels = data?.data || [];
  const meta = data?.meta;

  const openDetail = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const closeDetail = () => {
    setSelectedParcel(null);
    setIsModalOpen(false);
  };

  // Skeleton rows for table
  const renderSkeletonRows = () => {
    return Array.from({ length: limit }).map((_, i) => (
      <tr key={i} className="border-b border-border">
        {Array.from({ length: 8 }).map((_, j) => (
          <td key={j} className="px-3 py-3">
            <Skeleton className="h-4 w-full" />
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="min-h-screen p-4 bg-background">
      <h1 className="text-2xl font-semibold mb-6 text-primary text-center">
        Pending Parcel Requests
      </h1>

      {parcels.length === 0 && !isLoading && (
        <p className="text-center col-span-full text-muted-foreground">
          No pending parcels found.
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-sm text-left text-muted-foreground border-b border-border">
              <th className="px-3 py-2">Tracking</th>
              <th className="px-3 py-2">Receiver</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Weight (g)</th>
              <th className="px-3 py-2">Pickup → Dropoff</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              renderSkeletonRows()
            ) : isError ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-red-500">
                  Failed to load parcels.
                </td>
              </tr>
            ) : parcels.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-8 text-center text-muted-foreground"
                >
                  No parcels found.
                </td>
              </tr>
            ) : (
              parcels.map((p: Parcel) => (
                <tr
                  key={p._id}
                  className="border-b border-border hover:bg-muted/50 dark:hover:bg-muted/30"
                >
                  <td className="px-3 py-3 text-sm">{p.trackingId || "-"}</td>
                  <td className="px-3 py-3 text-sm">{p.receiverName}</td>
                  <td className="px-3 py-3 text-sm">{p.parcelType}</td>
                  <td className="px-3 py-3 text-sm">{p.weight}</td>
                  <td className="px-3 py-3 text-sm">
                    <div className="max-w-xs truncate">
                      {p.pickupLocation} → {p.dropoffLocation}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium
            ${
              p.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                : p.status === "ACCEPTED"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : p.status === "IN_TRANSIT"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : p.status === "DELIVERED"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                : p.status === "CANCELLED"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
            }
          `}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="px-3 py-3 text-sm">
                    {p.createdAt
                      ? format(new Date(p.createdAt), "dd MMM yyyy")
                      : "-"}
                  </td>
                  <td className="px-3 py-3 text-sm">
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => openDetail(p)}>
                        Detail
                      </Button>
                      <AskConfirmation
                        title="Are you sure?"
                        description="Want to cancel this parcel?"
                        onDelete={() => cancelPendingParcelBySender(p._id)}
                      >
                        <Button size="sm" variant="destructive">
                          Cancel
                        </Button>
                      </AskConfirmation>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {meta && meta.totalPage > 1 && (
        <div className="mt-4 flex justify-end">
          <Pagination
            page={meta.page}
            totalPages={meta.totalPage}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}

      <ParcelDetailModal
        parcel={selectedParcel || undefined}
        isOpen={isModalOpen}
        onClose={closeDetail}
      />
    </div>
  );
}
