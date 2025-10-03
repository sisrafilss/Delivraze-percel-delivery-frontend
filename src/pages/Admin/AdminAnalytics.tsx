/* eslint-disable @typescript-eslint/no-explicit-any */
import StatCard from "@/components/modules/Dashboard/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/format";
import { useGetAdminStatsQuery } from "@/redux/features/parcel/admin.api";
import { Loader2, Package, RefreshCcw } from "lucide-react";
import React from "react";
import { toast } from "sonner";

// --- Types ---
type ParcelStatusCount = { _id: string; count: number };

// --- Helper: Background class based on status ---
const getStatusCardBg = (status: string): string => {
  switch (status) {
    case "DELIVERED":
      return "bg-gradient-to-r from-emerald-500 to-green-600 text-white dark:from-emerald-600 dark:to-green-700";
    case "ACCEPTED":
      return "bg-gradient-to-r from-blue-500 to-sky-600 text-white dark:from-blue-600 dark:to-sky-700";
    case "PENDING":
      return "bg-gradient-to-r from-amber-400 to-orange-500 text-white dark:from-amber-500 dark:to-orange-600";
    case "CANCELLED":
      return "bg-gradient-to-r from-rose-500 to-red-600 text-white dark:from-rose-600 dark:to-red-700";
    default:
      return "bg-muted text-foreground";
  }
};

export default function AdminAnalytics() {
  const { data, isLoading, isError, error, refetch } =
    useGetAdminStatsQuery(undefined);

  React.useEffect(() => {
    if (isError) {
      toast.error("Failed to load sender stats");
    }
  }, [isError, error]);

  const statuses: ParcelStatusCount[] = data?.data?.totalParcelsByStatus ?? [];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Admin Analytics</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch?.()}
            aria-label="Refresh stats"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Parcels card */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1 transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2 bg-muted/40 dark:bg-muted/30">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm">Total Parcels</div>
                  <div className="text-xs text-muted-foreground">
                    Overall count for this sender
                  </div>
                </div>
              </div>
              <Badge variant="outline">Sender</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="py-8 flex items-center justify-center">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Loading...</span>
              </div>
            ) : isError ? (
              <div className="text-center">
                <div className="text-sm text-destructive">Failed to load.</div>
                <Button variant="ghost" size="sm" onClick={() => refetch()}>
                  Retry
                </Button>
              </div>
            ) : (
              <div className="text-5xl font-bold">
                {formatNumber(data?.data.totalParcels ?? 0)}
              </div>
            )}
          </CardContent>
        </Card>

        {/* One card per status */}
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="w-full">
              <CardContent className="py-6">
                <Skeleton className="h-6 w-28 mb-3" />
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          ))
        ) : isError ? (
          <Card className="col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle>Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-destructive">
                {typeof error === "object" &&
                error !== null &&
                "message" in error
                  ? (error as { message: string }).message
                  : "Failed to load stats"}
              </p>
              <div className="mt-3">
                <Button onClick={() => refetch()}>Retry</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          statuses.map((s) => (
            <StatCard
              key={s._id}
              title={s._id}
              subtitle={`${s.count} parcels`}
              value={<span className="tabular-nums">{s.count}</span>}
              className={`${getStatusCardBg(s._id)} shadow-lg`}
            />
          ))
        )}
      </div>
    </section>
  );
}
