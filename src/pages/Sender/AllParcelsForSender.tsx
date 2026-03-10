/* eslint-disable @typescript-eslint/no-explicit-any */
import ParcelDetailModal from '@/components/modules/Parcels/ParcelDetailModal';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo, useState } from 'react';

import Pagination from '@/components/Pagination';
import { useGetAllParcelsBySenderQuery } from '@/redux/features/parcel/sender.api';
import type { Parcel } from '@/types';
import { format } from 'date-fns';
import type { CSSProperties } from 'react';

const STATUS_OPTIONS = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Accepted', value: 'ACCEPTED' },
  { label: 'In Transit', value: 'IN_TRANSIT' },
  { label: 'Delivered', value: 'DELIVERED' },
  { label: 'Cancelled', value: 'CANCELLED' },
];

export default function AllParcelsForSender() {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      status: selectedStatus === 'ALL' ? undefined : selectedStatus,
    }),
    [page, limit, selectedStatus]
  );

  const { data, isLoading, isError, refetch } = useGetAllParcelsBySenderQuery(
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
    <div className="page-enter space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary">All Parcels</h1>
          <p className="text-sm text-muted-foreground">
            Track, filter, and drill into every parcel you have requested.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
            Status
          </span>
          <select
            value={selectedStatus}
            onChange={(e) => {
              setPage(1);
              return setSelectedStatus(e.target.value);
            }}
            aria-label="Filter parcels by status"
            className="rounded-full border border-border px-3 py-2 text-sm text-foreground focus:ring focus:ring-primary/40"
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
          {["PENDING", "ACCEPTED", "IN_TRANSIT", "DELIVERED", "CANCELLED"].map(
            (status) => (
              <button
                key={status}
                type="button"
                onClick={() => {
                  setSelectedStatus(status);
                  setPage(1);
                }}
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase transition ${
                  selectedStatus === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-muted-foreground"
                }`}
              >
                {status}
              </button>
            ),
          )}
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
                  parcels.map((p: Parcel, index) => (
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
                        <Button size="sm" onClick={() => openDetail(p)}>
                          Show Details
                        </Button>
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
