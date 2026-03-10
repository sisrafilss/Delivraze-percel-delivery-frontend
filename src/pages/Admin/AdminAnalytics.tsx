/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import StatCard from '@/components/modules/Dashboard/StatsCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNumber } from '@/lib/format';
import { useGetAdminStatsQuery } from '@/redux/features/parcel/admin.api';
import { Loader2, Package, RefreshCcw } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

// --- Recharts imports ---
import { LazyLoadWrapper } from '@/components/LazyLoadWrapper';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

// --- Types ---
type ParcelStatusCount = { _id: string; count: number };
type MonthlyShipment = { count: number; month: number; year: number };
type ParcelTrend = { count: number; date: string };

// --- Helper: Background class based on status ---
const getStatusCardBg = (status: string): string => {
  switch (status) {
    case 'DELIVERED':
      return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white dark:from-emerald-600 dark:to-green-700';
    case 'ACCEPTED':
      return 'bg-gradient-to-r from-blue-500 to-sky-600 text-white dark:from-blue-600 dark:to-sky-700';
    case 'PENDING':
      return 'bg-gradient-to-r from-amber-400 to-orange-500 text-white dark:from-amber-500 dark:to-orange-600';
    case 'CANCELLED':
      return 'bg-gradient-to-r from-rose-500 to-red-600 text-white dark:from-rose-600 dark:to-red-700';
    default:
      return 'bg-muted text-foreground';
  }
};

// --- Colors for Pie chart ---
const PIE_COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']; // delivered, accepted, pending, cancelled

export default function AdminAnalytics() {
  const { data, isLoading, isError, error, refetch } =
    useGetAdminStatsQuery(undefined);

  React.useEffect(() => {
    if (isError) {
      toast.error("Failed to load admin stats");
    }
  }, [isError, error]);

  const statuses: ParcelStatusCount[] = data?.data?.totalParcelsByStatus ?? [];
  const monthlyShipments: MonthlyShipment[] =
    data?.data?.monthlyShipments ?? [];
  const parcelTrends: ParcelTrend[] = data?.data?.parcelTrends ?? [];
  const totalParcels = data?.data?.totalParcels ?? 0;
  const deliveredCount =
    statuses.find((status) => status._id === "DELIVERED")?.count ?? 0;
  const activeCount = statuses
    .filter((status) =>
      ["PENDING", "ACCEPTED", "IN_TRANSIT"].includes(status._id),
    )
    .reduce((acc, status) => acc + status.count, 0);
  const deliveryRate = totalParcels
    ? Math.round((deliveredCount / totalParcels) * 100)
    : 0;

  return (
    <LazyLoadWrapper>
      <section className="page-enter space-y-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Admin Analytics</h2>
            <p className="text-sm text-muted-foreground">
              Monitor the overall health of Delivraze operations and catch any
              distribution trends before they grow.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch?.()}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCcw className="h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>
        </div>

        <div className="dashboard-panel">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : isError ? (
            <div className="space-y-3 text-center">
              <p className="text-sm text-destructive">
                {typeof error === "object" &&
                error !== null &&
                "message" in error
                  ? (error as { message: string }).message
                  : "Failed to load stats"}
              </p>
              <Button onClick={() => refetch?.()}>Retry</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
                    Global Parcels
                  </p>
                  <p className="text-4xl font-bold text-foreground">
                    {formatNumber(totalParcels)}
                  </p>
                </div>
                <Badge variant="secondary">Admin</Badge>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-white/70 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/60">
                    Active
                  </p>
                  <p className="text-2xl font-semibold text-primary">
                    {formatNumber(activeCount)}
                  </p>
                  <p className="text-xs text-muted-foreground">In dispatch</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-white/70 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/60">
                    Delivered
                  </p>
                  <p className="text-2xl font-semibold text-foreground">
                    {formatNumber(deliveredCount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {deliveryRate}% success
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-white/70 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/60">
                    Awaiting
                  </p>
                  <p className="text-2xl font-semibold text-accent">
                    {formatNumber(totalParcels - deliveredCount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pending confirmation
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="py-6">
                  <Skeleton className="h-6 w-28 mb-3" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))
          ) : isError ? (
            <div className="dashboard-panel text-center">
              <p className="text-sm text-destructive">
                {typeof error === "object" &&
                error !== null &&
                "message" in error
                  ? (error as { message: string }).message
                  : "Failed to load stats"}
              </p>
              <Button onClick={() => refetch?.()}>Retry</Button>
            </div>
          ) : (
            statuses.map((s, index) => (
              <div
                key={s._id}
                className="card-enter"
                style={{ "--delay": `${index * 90 + 120}ms` } as React.CSSProperties}
              >
                <StatCard
                  title={s._id}
                  subtitle={`${s.count} parcels`}
                  value={<span className="tabular-nums">{s.count}</span>}
                  className={`${getStatusCardBg(s._id)} shadow-xl`}
                />
              </div>
            ))
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="dashboard-panel" style={{ "--delay": "180ms" } as React.CSSProperties}>
            <CardHeader className="p-0">
              <CardTitle>Delivery Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statuses}
                    dataKey="count"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry: any) => String(entry._id)}
                  >
                    {statuses.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ReTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </div>

          <div className="dashboard-panel" style={{ "--delay": "260ms" } as React.CSSProperties}>
            <CardHeader className="p-0">
              <CardTitle>Parcel Trends</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={parcelTrends.map((t) => ({
                    ...t,
                    date: new Date(t.date).toLocaleDateString(),
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ReTooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </div>

          <div className="dashboard-panel" style={{ "--delay": "340ms" } as React.CSSProperties}>
            <CardHeader className="p-0">
              <CardTitle>Monthly Shipments</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyShipments.map((m) => ({
                    ...m,
                    monthName: new Date(m.year, m.month - 1).toLocaleString(
                      "default",
                      { month: "short" },
                    ),
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="monthName" />
                  <YAxis />
                  <ReTooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </div>
        </div>
      </section>
    </LazyLoadWrapper>
  );
}
