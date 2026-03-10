/* eslint-disable @typescript-eslint/no-explicitany */

import ParcelDetailModal from "@/components/modules/Parcels/ParcelDetailModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetParcelByTrackingIdQuery } from "@/redux/features/parcel/parcel.api";
import type { Parcel } from "@/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search, Package, Truck, Clock, MapPin } from "lucide-react";
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
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Track a Parcel
        </h1>
        <p className="text-muted-foreground mt-1">
          Enter your tracking ID to see the current status of your parcel
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-animated card-glow hover-lift">
          <CardContent className="p-6">
            {isFetching ? (
              <div className="space-y-4">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="trackingId"
                    render={({ field }) => (
                      <FormItem className="space-y-2 animate-fade-in">
                        <FormLabel className="text-base font-semibold">
                          Enter Parcel Tracking ID
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="e.g. 123456789"
                              autoFocus
                              {...field}
                              className="pr-12 hover:scale-[1.01] transition-transform"
                            />
                            <Button
                              type="submit"
                              className="absolute right-1 top-1 bottom-1 hover:scale-110 transition-transform"
                              size="sm"
                              disabled={isFetching || !form.formState.isValid}
                            >
                              {isFetching ? (
                                <Skeleton className="h-4 w-4 rounded-full animate-spin" />
                              ) : (
                                <Search className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {isError && (
                    <p className="text-sm text-destructive animate-shake">
                      {error &&
                      typeof error === "object" &&
                      error !== null &&
                      "data" in error
                        ? (error.data as any)?.message || "Parcel not found."
                        : "Parcel not found."}
                    </p>
                  )}
                </form>
              </Form>
            )}
          </CardContent>
        </Card>

        <Card className="card-animated card-glow hover-lift" style={{ animationDelay: "100ms" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 animate-fade-in">
              <Package className="h-5 w-5 animate-icon-bounce" />
              Delivery Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 animate-fade-in-left animation-delay-100">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform">
                  <Truck className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-icon-bounce" />
                </div>
                <div>
                  <p className="font-medium">Live Tracking</p>
                  <p className="text-muted-foreground text-xs">
                    Every stop is recorded with GPS, time, and courier notes
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 animate-fade-in-left animation-delay-200">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform">
                  <Clock className="h-4 w-4 text-green-600 dark:text-green-400 animate-icon-bounce" />
                </div>
                <div>
                  <p className="font-medium">Instant Updates</p>
                  <p className="text-muted-foreground text-xs">
                    SMS and email updates for pickups, transit, and delivery
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 animate-fade-in-left animation-delay-300">
                <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform">
                  <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-400 animate-icon-bounce" />
                </div>
                <div>
                  <p className="font-medium">Proof of Delivery</p>
                  <p className="text-muted-foreground text-xs">
                    Photos, signatures, and OTPs ensure safe handoffs
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
