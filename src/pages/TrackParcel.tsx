/* eslint-disable @typescript-eslint/no-explicit-any */

import ParcelDetailModal from '@/components/modules/Parcels/ParcelDetailModal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetParcelByTrackingIdQuery } from '@/redux/features/parcel/parcel.api';
import type { Parcel } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const trackingSchema = z.object({
  trackingId: z
    .string()
    .min(5, 'Tracking ID must be at least 5 characters')
    .max(32, 'Tracking ID too long'),
});

type TrackingFormValues = z.infer<typeof trackingSchema>;

const TrackParcel: React.FC = () => {
  const [trackingId, setTrackingId] = useState<string>('');

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
    defaultValues: { trackingId: '' },
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
    <main className="page-enter flex flex-col gap-10 px-4 py-12 md:px-8 lg:px-16">
      <section className="mx-auto w-full max-w-3xl text-center space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground/70">
          Real-time visibility
        </p>
        <h1 className="text-3xl font-bold text-foreground">Track a Parcel</h1>
        <p className="text-sm text-muted-foreground">
          Enter your tracking ID and instantly see where your parcel is along
          the journey with verified scans, updates, and proof of delivery.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-border/70 bg-card/90 p-6 shadow-2xl">
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
                    <FormItem className="space-y-2">
                      <div className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground/70">
                        Track your parcel
                      </div>
                      <FormLabel className="text-lg font-semibold">
                        Enter Parcel Tracking ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 123456789"
                          autoFocus
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full rounded-full"
                  disabled={isFetching || !form.formState.isValid}
                >
                  {isFetching ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Tracking...
                    </span>
                  ) : (
                    "Track Parcel"
                  )}
                </Button>
                {isError && (
                  <p className="text-sm text-destructive">
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
        </div>

        <div className="space-y-6 rounded-[2rem] border border-border/60 bg-gradient-to-br from-secondary/20 via-background to-primary/20 p-6 text-sm text-muted-foreground shadow-xl">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
            <span>Delivery insights</span>
            <span>Always transparent</span>
          </div>
          <div className="space-y-3">
            <p>
              <strong className="text-foreground">Live scans:</strong> Every
              stop is recorded with GPS, time, and courier notes.
            </p>
            <p>
              <strong className="text-foreground">Instant alerts:</strong> SMS
              and email updates trigger for pickups, transit, and delivery.
            </p>
            <p>
              <strong className="text-foreground">Proof of delivery:</strong>{" "}
              Photos, signatures, and OTPs ensure safe handoffs.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white/70 p-4 text-sm text-muted-foreground shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
              Need help?
            </p>
            <p className="text-foreground">
              Support at support@delivraze.com · +88 0181 234 5678
            </p>
          </div>
        </div>
      </section>

      {parcelData && (
        <ParcelDetailModal
          parcel={selectedParcel || undefined}
          isOpen={isModalOpen}
          onClose={closeDetail}
        />
      )}
    </main>
  );
};

export default TrackParcel;
