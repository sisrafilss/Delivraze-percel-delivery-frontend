/* eslint-disable @typescript-eslint/no-explicit-any */

import ParcelDetailModal from "@/components/modules/Parcels/ParcelDetailModal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetParcelByTrackingIdQuery } from "@/redux/features/parcel/parcel.api";
import type { Parcel } from "@/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const trackingSchema = z.object({
  trackingId: z
    .string()
    .min(5, "Tracking ID must be at least 5 characters")
    .max(32, "Tracking ID too long"),
});

type TrackingFormValues = z.infer<typeof trackingSchema>;

const TrackParcel: React.FC = () => {
  const [trackingId, setTrackingId] = useState<string>("");

  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: parcelData,
    isFetching,
    isError,
    error,
  } = useGetParcelByTrackingIdQuery(trackingId, {
    skip: !trackingId,
  });

  const form = useForm<TrackingFormValues>({
    resolver: zodResolver(trackingSchema),
    defaultValues: { trackingId: "" },
  });

  const onSubmit = (values: TrackingFormValues) => {
    if (values.trackingId === trackingId && parcelData) {
      openDetail(parcelData.data);
    } else {
      setTrackingId(values.trackingId);
    }
  };

  React.useEffect(() => {
    if (parcelData) {
      console.log(parcelData);
      openDetail(parcelData?.data);
    }
  }, [parcelData]);

  const openDetail = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const closeDetail = () => {
    setSelectedParcel(null);
    setIsModalOpen(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center  px-4 py-8 bg-background transition-colors`}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md bg-card p-6 rounded-lg shadow-md space-y-4"
        >
          <FormField
            control={form.control}
            name="trackingId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Enter Parcel Tracking ID
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 123456789" autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isFetching || !form.formState.isValid}
          >
            {isFetching ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Tracking...
              </span>
            ) : (
              "Track Parcel"
            )}
          </Button>
          {isError && (
            <div className="text-destructive text-sm mt-2">
              {error &&
              typeof error === "object" &&
              error !== null &&
              "data" in error
                ? (error.data as any)?.message || "Parcel not found."
                : "Parcel not found."}
            </div>
          )}
        </form>
      </Form>

      {parcelData && (
        <ParcelDetailModal
          parcel={selectedParcel || undefined}
          isOpen={isModalOpen}
          onClose={closeDetail}
        />
      )}
    </div>
  );
};

export default TrackParcel;
