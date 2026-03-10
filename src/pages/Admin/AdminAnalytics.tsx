/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/format";
import { useGetAdminStatsQuery } from "@/redux/features/parcel/admin.api";
import { Loader2, RefreshCcw, Package, Truck, CheckCircle, Clock } from "lucide-react";
import React from "react";
import { toast } from "sonner";

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
} from "recharts";

type ParcelStatusCount = { _id: string; count: number };
type MonthlyShipment = { count: number; month: number; year: number };
type ParcelTrend = { count: number; date: string };

const getStatusColor = (status: string): string => {
  switch (status) {
    case "DELIVERED":
      return "#10b981";
    case "ACCEPTED":
      return "#3b82f6";
    case "PENDING":
      return "#f59e0b";
    case "IN_TRANSIT":
      return "#8b5cf6";
    case "CANCELLED":
      return "#ef4444";
    default:
      return "#64748b";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "DELIVERED":
      return CheckCircle;
    case "ACCEPTED":
      return Package;
    case "PENDING":
      return Clock;
    case "IN_TRANSIT":
      return Truck;
    default:
      return Package;
  }
};

const PIE_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

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
      ["PENDING", "ACCEPTED", "IN_TRANSIT"].includes(status._id)
    )
    .reduce((acc, status) => acc + status.count, 0);
  const deliveryRate = totalParcels
    ? Math.round((deliveredCount / totalParcels) * 100)
    : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Admin Analytics
          </h2>
          <p className="text-muted-foreground mt-1">
            Monitor the overall health of Delivraze operations
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch?.()}
          className="gap-2 hover:scale-105 transition-transform animate-fade-in-up animation-delay-100"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="card-animated" style={{ animationDelay: `${i * 100}ms` }}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <Card className="p-6 card-animated">
          <div className="text-center">
            <p className="text-destructive mb-4">
              {typeof error === "object" &&
              error !== null &&
              "message" in error
                ? (error as { message: string }).message
                : "Failed to load stats"}
            </p>
            <Button onClick={() => refetch?.()}>Retry</Button>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="card-animated card-glow hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="animate-fade-in">
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Parcels
                    </p>
                    <p className="text-3xl md:text-4xl font-bold text-foreground mt-1">
                      {formatNumber(totalParcels)}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center animate-scale-in animation-delay-200">
                    <Package className="h-6 w-6 text-primary animate-icon-bounce" />
                  </div>
                </div>
                <Badge variant="secondary" className="mt-3 animate-fade-in animation-delay-300">
                  Admin View
                </Badge>
              </CardContent>
            </Card>

            <Card className="card-animated card-glow hover-lift" style={{ animationDelay: "100ms" }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="animate-fade-in">
                    <p className="text-sm font-medium text-muted-foreground">
                      Active Shipments
                    </p>
                    <p className="text-3xl md:text-4xl font-bold text-primary mt-1">
                      {formatNumber(activeCount)}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center animate-scale-in animation-delay-300">
                    <Truck className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-icon-bounce" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 animate-fade-in animation-delay-400">
                  In dispatch
                </p>
              </CardContent>
            </Card>

            <Card className="card-animated card-glow hover-lift" style={{ animationDelay: "200ms" }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="animate-fade-in">
                    <p className="text-sm font-medium text-muted-foreground">
                      Delivered
                    </p>
                    <p className="text-3xl md:text-4xl font-bold text-green-600 mt-1">
                      {formatNumber(deliveredCount)}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center animate-scale-in animation-delay-400">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 animate-icon-bounce" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 animate-fade-in animation-delay-500">
                  {deliveryRate}% success rate
                </p>
              </CardContent>
            </Card>

            <Card className="card-animated card-glow hover-lift" style={{ animationDelay: "300ms" }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="animate-fade-in">
                    <p className="text-sm font-medium text-muted-foreground">
                      Pending
                    </p>
                    <p className="text-3xl md:text-4xl font-bold text-amber-600 mt-1">
                      {formatNumber(totalParcels - deliveredCount)}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center animate-scale-in animation-delay-500">
                    <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400 animate-icon-bounce" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 animate-fade-in animation-delay-600">
                  Awaiting confirmation
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {statuses.map((s, index) => {
              const Icon = getStatusIcon(s._id);
              return (
                <Card
                  key={s._id}
                  className="card-animated card-glow hover-lift"
                  style={{ animationDelay: `${index * 80 + 400}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center animate-scale-in"
                        style={{ 
                          backgroundColor: getStatusColor(s._id) + "20",
                          animationDelay: `${index * 80 + 500}ms`
                        }}
                      >
                        <Icon
                          className="h-5 w-5 animate-icon-bounce"
                          style={{ color: getStatusColor(s._id) }}
                        />
                      </div>
                      <div className="animate-fade-in" style={{ animationDelay: `${index * 80 + 600}ms` }}>
                        <p className="text-sm font-medium text-muted-foreground">
                          {s._id.replace("_", " ")}
                        </p>
                        <p className="text-2xl font-bold">{s.count}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="card-animated hover-lift" style={{ animationDelay: "600ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base animate-fade-in">
                  Delivery Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 animate-fade-in animation-delay-200">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statuses}
                        dataKey="count"
                        nameKey="_id"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        innerRadius={40}
                        paddingAngle={2}
                        label={({ name, percent }) =>
                          `${name} ${((percent || 0) * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {statuses.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <ReTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="card-animated hover-lift" style={{ animationDelay: "700ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base animate-fade-in">
                  Parcel Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 animate-fade-in animation-delay-300">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={parcelTrends.map((t) => ({
                        ...t,
                        date: new Date(t.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        }),
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis
                        dataKey="date"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <ReTooltip />
                      <Bar
                        dataKey="count"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                        name="Parcels"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="card-animated hover-lift md:col-span-2 lg:col-span-1" style={{ animationDelay: "800ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base animate-fade-in">
                  Monthly Shipments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 animate-fade-in animation-delay-400">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyShipments.map((m) => ({
                        ...m,
                        monthName: new Date(m.year, m.month - 1).toLocaleString(
                          "default",
                          { month: "short" }
                        ),
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis
                        dataKey="monthName"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <ReTooltip />
                      <Bar
                        dataKey="count"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        name="Shipments"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
