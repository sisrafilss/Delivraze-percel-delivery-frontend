import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { format } from "date-fns";

export type IncomingParcel = {
  _id: string;
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverEmail: string;
  parcelType: string;
  weight: number;
  specialInstructions?: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: string;
  statusLog: {
    status: string;
    updatedBy: { name: string; role: string; email: string };
    note?: string;
    location?: string;
    timestamp: string;
  }[];
  paymentMethod: string;
  isPaid: boolean;
  trackingId: string;
};

interface Props {
  parcel?: IncomingParcel;
  isOpen: boolean;
  onClose: () => void;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  ACCEPTED: "bg-green-500/20 text-green-700 dark:text-green-400",
  IN_TRANSIT: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
  DELIVERED: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
  CANCEL: "bg-red-500/20 text-red-700 dark:text-red-400",
};

export default function IncomingParcelDetailModal({
  parcel,
  isOpen,
  onClose,
}: Props) {
  if (!parcel) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Parcel Details</DialogTitle>
          <DialogDescription>
            Tracking ID: {parcel.trackingId}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-4 text-sm">
            {/* Sender Info */}
            <div>
              <h3 className="font-medium text-primary">Sender</h3>
              <p>{parcel.senderName}</p>
              <p>{parcel.senderPhone}</p>
              <p>{parcel.senderAddress}</p>
            </div>

            {/* Receiver Info */}
            <div>
              <h3 className="font-medium text-primary">Receiver</h3>
              <p>{parcel.receiverName}</p>
              <p>{parcel.receiverPhone}</p>
              <p>{parcel.receiverAddress}</p>
              <p>{parcel.receiverEmail}</p>
            </div>

            {/* Parcel Info */}
            <div>
              <h3 className="font-medium text-primary">Parcel Info</h3>
              <p>Type: {parcel.parcelType}</p>
              <p>Weight: {parcel.weight} g</p>
              <p>Pickup: {parcel.pickupLocation}</p>
              <p>Dropoff: {parcel.dropoffLocation}</p>
              {parcel.specialInstructions && (
                <p className="italic text-muted-foreground">
                  Note: {parcel.specialInstructions}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <h3 className="font-medium text-primary">Status</h3>
              <Badge
                className={
                  statusColors[parcel.status] || "bg-gray-500/20 text-gray-700"
                }
              >
                {parcel.status}
              </Badge>
            </div>

            {/* Payment */}
            <div>
              <h3 className="font-medium text-primary">Payment</h3>
              <p>Method: {parcel.paymentMethod}</p>
              <p>Status: {parcel.isPaid ? "Paid" : "Unpaid"}</p>
            </div>

            {/* Status Log */}
            {parcel.statusLog.length > 0 && (
              <div>
                <h3 className="font-medium text-primary mb-2">Status Log</h3>
                <div className="space-y-2">
                  {parcel.statusLog.map((log, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-md border border-border ${
                        statusColors[log.status] || "bg-muted"
                      }`}
                    >
                      <p className="font-semibold">{log.status}</p>
                      <p className="text-xs">
                        By: {log.updatedBy.name} ({log.updatedBy.role})
                      </p>
                      {log.note && <p className="text-xs">Note: {log.note}</p>}
                      {log.location && (
                        <p className="text-xs">Location: {log.location}</p>
                      )}
                      <p className="text-xs">
                        {format(
                          new Date(log.timestamp),
                          "dd MMM yyyy, hh:mm a"
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
