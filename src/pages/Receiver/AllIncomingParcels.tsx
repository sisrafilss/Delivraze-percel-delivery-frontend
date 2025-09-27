/* eslint-disable @typescript-eslint/no-explicit-any */
import ParcelDetailModal, {
  type Parcel,
} from "@/components/modules/Parcels/ParcelDetailModal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useMemo, useState } from "react";

import AskConfirmation from "@/components/AskConfirmation";
import {
  useGetAllIncommingParcelsByReceiverQuery,
  useMarkAsDeliveredMutation,
} from "@/redux/features/Parcel/receiver.api";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "In Transit", value: "IN_TRANSIT" },
];

export default function AllIncommingParcels() {
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markAsDelivered] = useMarkAsDeliveredMutation();

  // call RTK query with selected status (convert ALL to undefined to fetch everything)
  const queryArg = useMemo(
    () => (selectedStatus === "ALL" ? {} : { status: selectedStatus }),
    [selectedStatus]
  );

  const { data, isLoading, isError, refetch } =
    useGetAllIncommingParcelsByReceiverQuery(
      // Typescript: pass queryArg as any if signature requires specific shape
      queryArg as any,
      { refetchOnMountOrArgChange: true }
    );

  const parcels = data?.data || [];

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
      const res = await markAsDelivered({
        _id: parcelId,
      }).unwrap();

      if (res?.success) {
        toast.success("Parcel marked as delivered successfully.");
      }
      console.log("Parcel marked as delivered successfully.");
      // Optionally trigger refetch
      refetch();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 className="text-2xl font-semibold text-primary">All Parcels</h1>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <p>Select Status</p>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-md border border-border bg-white text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              aria-label="Filter parcels by status"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <Button onClick={() => refetch()} variant="outline">
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : isError ? (
          <div className="py-8 text-center text-red-500">
            Failed to load parcels.
          </div>
        ) : parcels.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No parcels found.
          </div>
        ) : (
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
                  {/* <th className="px-3 py-2">Created</th> */}
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {parcels.map((p: Parcel) => (
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

                    {/* <td className="px-3 py-3 text-sm">
                      {p.createdAt
                        ? format(new Date(p.createdAt), "dd MMM yyyy")
                        : "-"}
                    </td> */}
                    <td className="px-3 py-3 text-sm">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDetail(p)}
                        >
                          Show Details
                        </Button>
                        {/* Example placeholder action button (edit/cancel) */}

                        <AskConfirmation
                          onDelete={() => handleUpdateParcelStatus(p._id)}
                        >
                          <Button
                            size="sm"
                            onClick={() =>
                              console.log("placeholder action for", p._id)
                            }
                          >
                            Mark as Delivered
                          </Button>
                        </AskConfirmation>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
