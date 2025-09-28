/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

type ParcelDetailModalProps = {
  open: boolean;
  onClose: () => void;
  parcel: any | null; // type this properly with your Parcel type
};

const statusColors: Record<string, string> = {
  PENDING: "text-yellow-600 dark:text-yellow-400",
  ACCEPTED: "text-green-600 dark:text-green-400",
  IN_TRANSIT: "text-blue-600 dark:text-blue-400",
  DELIVERED: "text-emerald-600 dark:text-emerald-400",
  CANCELLED: "text-red-600 dark:text-red-400",
};

export const ParcelDetailModal: React.FC<ParcelDetailModalProps> = ({
  open,
  onClose,
  parcel,
}) => {
  if (!parcel) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] p-0">
        <DialogHeader className="p-4">
          <DialogTitle>Parcel Details</DialogTitle>
          <DialogDescription>
            Full information about the selected parcel.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="px-4 pb-4 max-h-[60vh]">
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-semibold">Sender:</span> {parcel.senderName}{" "}
              ({parcel.senderEmail})
            </p>
            <p>
              <span className="font-semibold">Receiver:</span>{" "}
              {parcel.receiverName} - {parcel.receiverPhone}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {parcel.receiverAddress}
            </p>
            <p>
              <span className="font-semibold">Parcel Type:</span>{" "}
              {parcel.parcelType}
            </p>
            <p>
              <span className="font-semibold">Weight:</span> {parcel.weight}g
            </p>
            <p>
              <span className="font-semibold">Pickup:</span>{" "}
              {parcel.pickupLocation}
            </p>
            <p>
              <span className="font-semibold">Dropoff:</span>{" "}
              {parcel.dropoffLocation}
            </p>
            <p>
              <span className="font-semibold">Special Instructions:</span>{" "}
              {parcel.specialInstructions || "N/A"}
            </p>
            <p className={`font-semibold ${statusColors[parcel.status] || ""}`}>
              Status: {parcel.status}
            </p>
          </div>
        </ScrollArea>

        <DialogFooter className="p-4">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
