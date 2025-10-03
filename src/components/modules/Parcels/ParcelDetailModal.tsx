import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Parcel } from "@/types";
import { format } from "date-fns";

type ParcelDetailModalProps = {
  parcel?: Parcel | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ParcelDetailModal({
  parcel,
  isOpen,
  onClose,
}: ParcelDetailModalProps) {
  if (!isOpen) return null;

  // helper to map status -> badge color classes
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in transit":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "delivered":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />

      {/* modal panel */}
      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="rounded-lg shadow-xl border border-border">
          <CardHeader>
            <CardTitle>Parcel Details</CardTitle>
          </CardHeader>

          <CardContent>
            {!parcel ? (
              <p className="text-sm text-muted-foreground">
                No parcel selected.
              </p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {/* Sender */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Sender</h3>
                  <p className="text-sm">
                    <strong>Name:</strong> {parcel.senderName}
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> {parcel.senderEmail}
                  </p>
                  <p className="text-sm">
                    <strong>Phone:</strong> {parcel.senderPhone}
                  </p>
                  <p className="text-sm">
                    <strong>Address:</strong> {parcel.senderAddress}
                  </p>
                </div>

                {/* Receiver */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Receiver</h3>
                  <p className="text-sm">
                    <strong>Name:</strong> {parcel.receiverName}
                  </p>
                  <p className="text-sm">
                    <strong>Phone:</strong> {parcel.receiverPhone}
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> {parcel.receiverEmail || "-"}
                  </p>
                  <p className="text-sm">
                    <strong>Address:</strong> {parcel.receiverAddress}
                  </p>
                </div>

                {/* Parcel Info */}
                <div>
                  <h3 className="text-sm font-semibold mt-3">Parcel Info</h3>
                  <p className="text-sm">
                    <strong>Type:</strong> {parcel.parcelType}
                  </p>
                  <p className="text-sm">
                    <strong>Weight:</strong> {parcel.weight} g
                  </p>
                  <p className="text-sm">
                    <strong>Pickup:</strong> {parcel.pickupLocation}
                  </p>
                  <p className="text-sm">
                    <strong>Dropoff:</strong> {parcel.dropoffLocation}
                  </p>
                  <p className="text-sm">
                    <strong>Tracking ID:</strong> {parcel.trackingId || "-"}
                  </p>
                  <p className="text-sm">
                    <strong>Is Blocked:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium
                      ${
                        parcel.isBlocked
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }
                      `}
                    >
                      {parcel.isBlocked ? "Yes" : "No"}
                    </span>
                  </p>
                </div>

                {/* Status & Payment */}
                <div>
                  <h3 className="text-sm font-semibold mt-3">
                    Status & Payment
                  </h3>
                  <p className="text-sm">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium
      ${
        parcel.status === "PENDING"
          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          : parcel.status === "ACCEPTED"
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          : parcel.status === "IN_TRANSIT"
          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          : parcel.status === "DELIVERED"
          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
          : parcel.status === "CANCEL"
          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      }
    `}
                    >
                      {parcel.status}
                    </span>
                  </p>
                  <p className="text-sm">
                    <strong>Payment:</strong> {parcel.paymentMethod || "-"}
                  </p>
                  <p className="text-sm">
                    <strong>Is Paid:</strong> {parcel.isPaid ? "Yes" : "No"}
                  </p>
                </div>

                {/* Special Instructions */}
                <div className="md:col-span-2">
                  <h3 className="text-sm font-semibold mt-3">
                    Special Instructions
                  </h3>
                  <p className="text-sm">{parcel.specialInstructions || "-"}</p>
                </div>

                {/* Status Log Timeline */}
                {parcel.statusLog && parcel.statusLog.length > 0 && (
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-sm font-semibold mb-2">Status Log</h3>
                    <div className="relative border-l border-muted-foreground/30 pl-6">
                      {parcel.statusLog.map((log, idx) => (
                        <div key={idx} className="mb-6 last:mb-0 relative">
                          {/* Timeline dot */}
                          <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-primary bg-background" />

                          {/* Content */}
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="secondary"
                                className={getStatusColor(log.status)}
                              >
                                {log.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {format(
                                  new Date(log.timestamp),
                                  "dd MMM yyyy, hh:mm a"
                                )}
                              </span>
                            </div>
                            <p className="text-sm">{log.note}</p>
                            <p className="text-xs text-muted-foreground">
                              📍 {log.location} • Updated by{" "}
                              {log.updatedBy.name} ({log.updatedBy.role})
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Close */}
                <div className="md:col-span-2 flex justify-end mt-3">
                  <Button variant="ghost" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
