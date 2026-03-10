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
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

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
    [page, limit],
  );

  const { data, isLoading, isError, refetch } = useGetAllParcelsBySenderQuery({
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

  const handleCancel = async (parcelId: string) => {
    try {
      const res = await cancelPendingParcelBySender(parcelId).unwrap();
      if (res?.success) {
        toast.success("Parcel request cancelled.");
      }
      refetch();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message);
    }
  };

  const renderSkeletonRows = () =>
    Array.from({ length: limit }).map((_, i) => (
      <tr key={i} className="border-b border-border">
        {Array.from({ length: 8 }).map((_, j) => (
          <td key={j} className="px-3 py-3">
            <Skeleton className="h-4 w-full" />
          </td>
        ))}
      </tr>
    ));

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-primary text-center">
          Pending Parcel Requests
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          Cancel any pending parcel before it is dispatched to avoid rework.
        </p>
      </div>

      <div className="dashboard-panel space-y-4">
        <div className="dashboard-table-scroll">
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
                    <td colSpan={8} className="py-8 text-center text-destructive">
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
                  parcels.map((p: Parcel, index: number) => (
                    <tr
                      key={p._id}
                      className="row-enter border-b border-border hover:bg-muted/50 dark:hover:bg-muted/30"
                      style={{ "--delay": `${index * 35}ms` } as CSSProperties}
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
                        <span className="px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
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
                            onDelete={() => handleCancel(p._id)}
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
        </div>

        {meta && meta.totalPage > 1 && (
          <div className="flex justify-end">
            <Pagination
              page={meta.page}
              totalPages={meta.totalPage}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        )}
      </div>

      <ParcelDetailModal
        parcel={selectedParcel || undefined}
        isOpen={isModalOpen}
        onClose={closeDetail}
      />
    </div>
  );
}
