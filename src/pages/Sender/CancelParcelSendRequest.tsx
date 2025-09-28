/* eslint-disable @typescript-eslint/no-explicit-any */
import AskConfirmation from "@/components/AskConfirmation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  useCancelPendingParcelBySenderMutation,
  useGetAllParcelsBySenderQuery,
} from "@/redux/features/parcel/sender.api";
import { format } from "date-fns";

export default function CancelParcelSendRequest() {
  //   const [isConfirm, setIsConfirm] = useState(false);

  const { data, isLoading, isError } = useGetAllParcelsBySenderQuery({
    status: "PENDING",
  });

  const [cancelPendingParcelBySender] =
    useCancelPendingParcelBySenderMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load pending parcels.
      </div>
    );
  }

  const parcels = data?.data || [];

  return (
    <div className="min-h-screen p-4 bg-background">
      <h1 className="text-2xl font-semibold mb-6 text-primary text-center">
        Pending Parcel Requests
      </h1>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {parcels.length === 0 && (
          <p className="text-center col-span-full text-muted-foreground">
            No pending parcels found.
          </p>
        )}

        {parcels.map((parcel: any) => (
          <Card
            key={parcel._id}
            className="border border-border rounded-2xl shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                {parcel.receiverName} ({parcel.parcelType})
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p>
                <strong>Pickup:</strong> {parcel.pickupLocation}
              </p>
              <p>
                <strong>Dropoff:</strong> {parcel.dropoffLocation}
              </p>
              <p>
                <strong>Weight:</strong> {parcel.weight} g
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {format(new Date(parcel.createdAt), "dd MMM yyyy, hh:mm a")}
              </p>
              <p>
                <strong>Tracking ID:</strong> {parcel.trackingId}
              </p>
              <AskConfirmation
                onDelete={() => cancelPendingParcelBySender(parcel._id)}
              >
                <Button variant="destructive" className="mt-2 w-full">
                  Cancel
                </Button>
              </AskConfirmation>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
