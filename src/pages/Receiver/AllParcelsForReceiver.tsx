/* eslint-disable @typescript-eslint/no-explicit-any */
import ParcelDetailModal from "@/components/modules/Parcels/ParcelDetailModal";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import type { DashboardTableColumn } from "@/components/ui/dashboard-table";
import { DashboardTable } from "@/components/ui/dashboard-table";
import { useGetAllParcelsByReceiverQuery } from "@/redux/features/parcel/receiver.api";
import type { Parcel } from "@/types";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { Filter, RefreshCw } from "lucide-react";

const STATUS_OPTIONS = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "In Transit", value: "IN_TRANSIT" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const getStatusClass = (status: string): string => {
  switch (status) {
    case "DELIVERED":
      return "status-delivered";
    case "ACCEPTED":
    case "IN_TRANSIT":
      return "status-accepted";
    case "PENDING":
      return "status-pending";
    case "CANCELLED":
      return "status-cancelled";
    default:
      return "";
  }
};

export default function AllParcelsByReceiver() {
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      status: selectedStatus === "ALL" ? undefined : selectedStatus,
    }),
    [page, limit, selectedStatus]
  );

  const { data, isLoading, refetch } = useGetAllParcelsByReceiverQuery(
    queryParams,
    { refetchOnMountOrArgChange: true }
  );

  const parcels = data?.data || [];
  const meta = data?.meta;

  useEffect(() => {
    setPage(1);
  }, [selectedStatus]);

  const openDetail = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const closeDetail = () => {
    setSelectedParcel(null);
    setIsModalOpen(false);
  };

  const columns: DashboardTableColumn<Parcel>[] = [
    {
      header: "Tracking",
      accessor: (parcel) => parcel.trackingId || "-",
    },
    { header: "Receiver", accessor: (parcel) => parcel.receiverName },
    {
      header: "Type",
      accessor: (parcel) => parcel.parcelType,
      mobileHidden: true,
    },
    {
      header: "Weight",
      accessor: (parcel) => `${parcel.weight}g`,
      mobileHidden: true,
    },
    {
      header: "Route",
      accessor: (parcel) => (
        <div className="max-w-xs truncate text-xs">
          {parcel.pickupLocation} → {parcel.dropoffLocation}
        </div>
      ),
      mobileHidden: true,
    },
    {
      header: "Status",
      accessor: (parcel) => (
        <span className={`status-badge ${getStatusClass(parcel.status)}`}>
          {parcel.status.replace("_", " ")}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (parcel) => (
        <Button size="sm" onClick={() => openDetail(parcel)}>
          Details
        </Button>
      ),
      className: "min-w-[100px]",
    },
  ];

  const rowStyle = (_parcel: Parcel, index: number) =>
    ({
      "--delay": `${index * 35}ms`,
    }) as CSSProperties;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Parcels</h1>
          <p className="text-muted-foreground mt-1">
            Monitor every incoming shipment and delivery history
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="card-modern">
        <div className="p-4 border-b border-border">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Quick Filters
            </span>
            {STATUS_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                variant={selectedStatus === opt.value ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedStatus(opt.value);
                  setPage(1);
                }}
                className="text-xs"
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <DashboardTable
            columns={columns}
            data={parcels}
            loading={isLoading}
            rowKey={(parcel) => parcel._id}
            emptyState={<span>No parcels found.</span>}
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
