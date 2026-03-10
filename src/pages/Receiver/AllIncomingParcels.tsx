/* eslint-disable @typescript-eslint/no-explicit-any */
import ParcelDetailModal from "@/components/modules/Parcels/ParcelDetailModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useMemo, useState } from "react";
import AskConfirmation from "@/components/AskConfirmation";
import Pagination from "@/components/Pagination";
import {
  useGetAllIncommingParcelsByReceiverQuery,
  useMarkAsDeliveredMutation,
} from "@/redux/features/parcel/receiver.api";
import type { Parcel } from "@/types";
import type { CSSProperties } from "react";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "In Transit", value: "IN_TRANSIT" },
];

export default function AllIncomingParcels() {
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markAsDelivered] = useMarkAsDeliveredMutation();

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      status: selectedStatus === "ALL" ? undefined : selectedStatus,
    }),
    [page, limit, selectedStatus],
  );

  const { data, isLoading, isError, refetch } =
    useGetAllIncommingParcelsByReceiverQuery(queryParams, {
      refetchOnMountOrArgChange: true,
    });

  const parcels = data?.data || [];
  const meta = data?.meta;

  useEffect(() => {
    refetch();
  }, [refetch]);

  const openDetail = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const closeDetail = () => {
    setSelectedParcel(null);
    setIsModalOpen(false);
  };

  const handleUpdateParcelStatus = async (parcelId: string) => {
    try {
      const res = await markAsDelivered({ _id: parcelId }).unwrap();

      if (res?.success) {
        toast.success("Parcel marked as delivered.");
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
        {Array.from({ length: 7 }).map((_, j) => (
          <td key={j} className="px-3 py-3">
            <Skeleton className="h-4 w-full" />
          </td>
        ))}
      </tr>
    ));

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary">All Parcels</h1>
          <p className="text-sm text-muted-foreground">
            Track incoming items, confirm delivery, and keep receivers updated.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
            Status
          </span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            aria-label="Filter parcels by status"
            className="rounded-full border border-border px-3 py-2 text-sm text-foreground focus:ring focus:ring-secondary/40"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="dashboard-panel space-y-5">
        <div className="dashboard-filter-ring flex flex-wrap items-center gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
            Quick filters
          </p>
          {STATUS_OPTIONS.filter((opt) => opt.value !== "ALL").map((status) => (
            <button
              key={status.value}
              type="button"
              onClick={() => setSelectedStatus(status.value)}
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase transition ${
                selectedStatus === status.value
                  ? "bg-secondary text-foreground"
                  : "bg-muted/60 text-muted-foreground"
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

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
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  renderSkeletonRows()
                ) : isError ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-destructive">
                      Failed to load parcels.
                    </td>
                  </tr>
                ) : parcels.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
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
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDetail(p)}
                          >
                            Show Details
                          </Button>
                          <AskConfirmation
                            onDelete={() => handleUpdateParcelStatus(p._id)}
                          >
                            <Button size="sm">Mark as Delivered</Button>
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
