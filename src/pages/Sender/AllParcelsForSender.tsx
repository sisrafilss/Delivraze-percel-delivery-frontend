/* eslint-disable @typescript-eslint/no-explicitany */
import ParcelDetailModal from "@/components/modules/Parcels/ParcelDetailModal";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import type { DashboardTableColumn } from "@/components/ui/dashboard-table";
import { DashboardTable } from "@/components/ui/dashboard-table";
import { useGetAllParcelsBySenderQuery } from "@/redux/features/parcel/sender.api";
import type { Parcel } from "@/types";
import { format } from "date-fns";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { RefreshCw, Filter } from "lucide-react";

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

export default function AllParcelsForSender() {
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

  const { data, isLoading, refetch } = useGetAllParcelsBySenderQuery(
    queryParams,
    { refetchOnMountOrArgChange: true }
  );

  const parcels: Parcel[] = data?.data || [];
  const meta = data?.meta;

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
      header: "Created",
      accessor: (parcel) =>
        parcel.createdAt
          ? format(new Date(parcel.createdAt), "MMM dd, yyyy")
          : "-",
      mobileHidden: true,
    },
    {
      header: "Actions",
      accessor: (parcel) => (
        <Button size="sm" onClick={() => openDetail(parcel)} className="hover:scale-105 transition-transform">
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
        <div className="animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            All Parcels
          </h1>
          <p className="text-muted-foreground mt-1">
            Track, filter, and view every parcel you have requested
          </p>
        </div>
        <div className="flex items-center gap-2 animate-fade-in-up animation-delay-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-2 hover:scale-105 transition-transform"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="card-animated card-glow hover-lift">
        <div className="p-4 border-b border-border animate-fade-in">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground animate-icon-bounce" />
            <span className="text-sm font-medium text-muted-foreground">
              Quick Filters
            </span>
            {STATUS_OPTIONS.map((opt, index) => (
              <Button
                key={opt.value}
                variant={selectedStatus === opt.value ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedStatus(opt.value);
                  setPage(1);
                }}
                className="text-xs hover:scale-105 transition-transform animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
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
            <div className="flex justify-end mt-4 animate-fade-in-up animation-delay-200">
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
