import ParcelFilters from "@/components/modules/Admin/ParcelFilters";
import { ParcelFormModal } from "@/components/modules/Admin/ParcelFormModal";
import ParcelTable from "@/components/modules/Admin/ParcelTable";
import ParcelDetailModal from "@/components/modules/Parcels/ParcelDetailModal";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllParcelsByAdminQuery } from "@/redux/features/parcel/admin.api";
import type { Parcel } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

export default function AdminAllParcelsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      status: selectedStatus === "ALL" ? undefined : selectedStatus,
      searchTerm: searchEmail || undefined,
    }),
    [page, limit, selectedStatus, searchEmail]
  );

  const { data, isLoading, refetch } =
    useGetAllParcelsByAdminQuery(queryParams);

  const parcels: Parcel[] = data?.data || [];
  const meta = data?.meta;

  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [selectedStatus]);

  const openDetail = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setIsDetailOpen(true);
  };

  const openEdit = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setIsEditOpen(true);
  };

  const closeModals = () => {
    setSelectedParcel(null);
    setIsDetailOpen(false);
    setIsEditOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            All Parcels
          </h1>
          <p className="text-muted-foreground mt-1">
            Review, edit, and manage every parcel in the system
          </p>
        </div>
        <div className="flex items-center gap-2 animate-fade-in-up animation-delay-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-2 hover:scale-105 transition-transform"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="card-animated card-glow hover-lift">
        <div className="p-4 border-b border-border animate-fade-in">
          <ParcelFilters
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            searchEmail={searchEmail}
            onEmailChange={setSearchEmail}
          />
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                <Skeleton className="h-6 w-24 flex-shrink-0" />
                <Skeleton className="h-6 w-24 flex-shrink-0" />
                <Skeleton className="h-6 w-24 flex-shrink-0" />
                <Skeleton className="h-6 w-24 flex-shrink-0" />
              </div>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 border-b border-border pb-3 flex-wrap md:flex-nowrap"
                >
                  <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                  <Skeleton className="h-4 w-48 flex-1 min-w-[120px]" />
                  <Skeleton className="h-4 w-36 hidden md:block flex-shrink-0" />
                  <Skeleton className="h-8 w-20 ml-auto flex-shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <ParcelTable
              parcels={parcels}
              onViewDetail={openDetail}
              onEdit={openEdit}
            />
          )}

          {meta && meta.totalPage > 1 && (
            <div className="flex justify-end mt-4 animate-fade-in-up animation-delay-200">
              <Pagination
                page={meta.page}
                totalPages={meta.totalPage}
                onPageChange={(p) => setPage(p)}
              />
            </div>
          )}
        </div>
      </div>

      <ParcelDetailModal
        parcel={selectedParcel || undefined}
        isOpen={isDetailOpen}
        onClose={closeModals}
      />

      <ParcelFormModal
        parcel={selectedParcel || undefined}
        open={isEditOpen}
        onClose={closeModals}
      />
    </div>
  );
}
