/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
// import { format } from "date-fns";
import AskConfirmation from "@/components/AskConfirmation";
import type { IncomingParcel } from "@/components/modules/Receiver/IncomingParcelDetailModal";
import IncomingParcelDetailModal from "@/components/modules/Receiver/IncomingParcelDetailModal";
import {
  useGetAllIncommingParcelsByReceiverQuery,
  useMarkAsDeliveredMutation,
} from "@/redux/features/Parcel/receiver.api";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  ACCEPTED: "bg-green-500/20 text-green-700 dark:text-green-400",
  IN_TRANSIT: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
  DELIVERED: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
  CANCEL: "bg-red-500/20 text-red-700 dark:text-red-400",
};

export default function Depricated_incomming() {
  const { data, isLoading, isError, refetch } =
    useGetAllIncommingParcelsByReceiverQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const [markAsDelivered] = useMarkAsDeliveredMutation();

  const parcels = data?.data || [];
  const [selectedParcel, setSelectedParcel] = useState<IncomingParcel | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetail = (parcel: IncomingParcel) => {
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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-primary">
            All Incoming Parcels
          </h1>
          <Button onClick={() => refetch()} variant="outline">
            Refresh
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 py-10">
            Failed to load parcels.
          </div>
        ) : parcels.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">
            No parcels found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-sm text-muted-foreground border-b border-border">
                  <th className="px-3 py-2 text-left">Tracking</th>
                  <th className="px-3 py-2 text-left">Sender</th>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2 text-left">Weight</th>
                  <th className="px-3 py-2 text-left">Pickup → Dropoff</th>
                  <th className="px-3 py-2 text-left">Status</th>

                  <th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((p: IncomingParcel) => (
                  <tr
                    key={p._id}
                    className="border-b border-border hover:bg-muted/50 dark:hover:bg-muted/30"
                  >
                    <td className="px-3 py-2 text-sm">{p.trackingId}</td>
                    <td className="px-3 py-2 text-sm">{p.senderName}</td>
                    <td className="px-3 py-2 text-sm">{p.parcelType}</td>
                    <td className="px-3 py-2 text-sm">{p.weight} g</td>
                    <td className="px-3 py-2 text-sm truncate max-w-xs">
                      {p.pickupLocation} → {p.dropoffLocation}
                    </td>
                    <td className="px-3 py-2 text-sm">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          statusColors[p.status] ||
                          "bg-gray-500/20 text-gray-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="px-3 py-2 text-sm">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDetail(p)}
                      >
                        View Details
                      </Button>
                    </td>
                    <td className="px-3 py-2 text-sm">
                      <AskConfirmation
                        onDelete={() => handleUpdateParcelStatus(p._id)}
                      >
                        <Button size="sm">Mark As Delivered</Button>
                      </AskConfirmation>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <IncomingParcelDetailModal
        parcel={selectedParcel || undefined}
        isOpen={isModalOpen}
        onClose={closeDetail}
      />
    </div>
  );
}
