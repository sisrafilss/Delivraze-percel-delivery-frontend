/* eslint-disable @typescript-eslint/no-explicit-any */
import AskConfirmation from "@/components/AskConfirmation";
import ParcelDetailModal from "@/components/modules/Parcels/ParcelDetailModal";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import type { DashboardTableColumn } from "@/components/ui/dashboard-table";
import { DashboardTable } from "@/components/ui/dashboard-table";
import {
  useCancelPendingParcelBySenderMutation,
  useGetAllParcelsBySenderQuery,
} from "@/redux/features/parcel/sender.api";
import type { Parcel } from "@/types";
import { format } from "date-fns";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

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

  const { data, isLoading, refetch } = useGetAllParcelsBySenderQuery({
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

  const columns: DashboardTableColumn<Parcel>[] = [
    {
      header: "Tracking",
      accessor: (parcel) => parcel.trackingId || "-",
    },
    { header: "Receiver", accessor: (parcel) => parcel.receiverName },
    { header: "Type", accessor: (parcel) => parcel.parcelType },
    { header: "Weight", accessor: (parcel) => `${parcel.weight}g` },
    {
      header: "Route",
      accessor: (parcel) => (
        <div className="max-w-xs truncate text-xs">
          {parcel.pickupLocation} → {parcel.dropoffLocation}
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (parcel) => (
        <span className="status-badge status-pending">
          {parcel.status.replace("_", " ")}
        </span>
      ),
    },
    {
      header: "Created",
      accessor: (parcel) =>
        parcel.createdAt
          ? format(new Date(parcel.createdAt), "MMM dd, yyyy")
          : "-",
    },
    {
      header: "Actions",
      accessor: (parcel) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => openDetail(parcel)}>
            Detail
          </Button>
          <AskConfirmation
            title="Cancel Parcel?"
            description="Are you sure you want to cancel this pending parcel request?"
            onDelete={() => handleCancel(parcel._id)}
          >
            <Button size="sm" variant="destructive">
              Cancel
            </Button>
          </AskConfirmation>
        </div>
      ),
      className: "min-w-[160px]",
    },
  ];

  const rowStyle = (_parcel: Parcel, index: number) =>
    ({
      "--delay": `${index * 35}ms`,
    }) as CSSProperties;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Pending Parcel Requests
          </h1>
          <p className="text-muted-foreground mt-1">
            Cancel any pending parcel before it is dispatched
          </p>
        </div>
      </div>

      <div className="card-modern">
        <div className="p-4">
          <DashboardTable
            columns={columns}
            data={parcels}
            loading={isLoading}
            rowKey={(parcel) => parcel._id}
            emptyState={
              <div className="text-center py-8">
                <p className="text-muted-foreground">No pending parcel requests.</p>
              </div>
            }
            rowStyle={rowStyle}
          />

          {meta && meta.totalPage > 1 && (
            <div className="flex justify-end mt-4">
              <Pagination
                page={meta.page}
                totalPages={meta.totalPage}
                onPageChange={(p) => setPage(p)}
              />
            </div>
          )}
        </div>
      </div>

      <ParcelDetailModal
        parcel={selectedParcel || undefined}
        isOpen={isModalOpen}
        onClose={closeDetail}
      />
    </div>
  );
}
