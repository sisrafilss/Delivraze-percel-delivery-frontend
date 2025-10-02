import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useMemo, useState } from "react";
// import ParcelTable from "./ParcelTable";
// import ParcelFilters from "./ParcelFilters";
// import ParcelDetailModal from "./ParcelDetailModal";
// import ParcelFormModal from "./ParcelFormModal";
// import {
//   useGetAllParcelsByAdmin,
// //   useDeleteParcelByAdminMutation,
// } from "@/redux/features/admin/adminParcel.api";
// import { ParcelDetailModal } from "@/components/modules/Admin/ParcelDetailModal";
import ParcelFilters from "@/components/modules/Admin/ParcelFilters";
import { ParcelFormModal } from "@/components/modules/Admin/ParcelFormModal";
import ParcelTable from "@/components/modules/Admin/ParcelTable";
import ParcelDetailModal from "@/components/modules/Parcels/ParcelDetailModal";
import Pagination from "@/components/Pagination";
import { useGetAllParcelsByAdminQuery } from "@/redux/features/parcel/admin.api";
import type { Parcel } from "@/types";

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

  const { data, isLoading, isError, refetch } =
    useGetAllParcelsByAdminQuery(queryParams);

  const parcels: Parcel[] = data?.data || [];

  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

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

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load parcels.
      </div>
    );
  }

  const meta = data?.meta;

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-primary">All Parcels</h1>
          <Button variant="outline" onClick={() => refetch()}>
            Refresh
          </Button>
        </div>

        <ParcelFilters
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          searchEmail={searchEmail}
          onEmailChange={setSearchEmail}
        />

        <ParcelTable
          parcels={parcels}
          onViewDetail={openDetail}
          onEdit={openEdit}
        />

        {meta && meta.totalPage > 1 && (
          <div className="mt-4 flex justify-end">
            <Pagination
              page={meta.page}
              totalPages={meta.totalPage}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        )}

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
    </div>
  );
}
