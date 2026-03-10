import AskConfirmation from "@/components/AskConfirmation";
import { Button } from "@/components/ui/button";
import { DashboardTable } from "@/components/ui/dashboard-table";
import type { DashboardTableColumn } from "@/components/ui/dashboard-table";
import { useDeleteParcelByAdminMutation } from "@/redux/features/parcel/admin.api";
import type { Parcel } from "@/types";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  ACCEPTED: "bg-green-500/20 text-green-700 dark:text-green-400",
  IN_TRANSIT: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
  DELIVERED: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
  CANCELLED: "bg-red-500/20 text-red-700 dark:text-red-400",
};

interface Props {
  parcels: Parcel[];
  onViewDetail: (parcel: Parcel) => void;
  onEdit: (parcel: Parcel) => void;
}

export default function ParcelTable({ parcels, onViewDetail, onEdit }: Props) {
  const [deleteParcelByAdmin] = useDeleteParcelByAdminMutation();

  const columns: DashboardTableColumn<Parcel>[] = [
    {
      header: "Tracking",
      accessor: (parcel) => parcel.trackingId,
    },
    {
      header: "Sender",
      accessor: (parcel) => parcel.senderEmail,
      mobileHidden: true,
    },
    {
      header: "Receiver",
      accessor: (parcel) => parcel.receiverEmail,
      mobileHidden: true,
    },
    {
      header: "Type",
      accessor: (parcel) => parcel.parcelType,
      mobileHidden: true,
    },
    {
      header: "Status",
      accessor: (parcel) => (
        <span
          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] ${
            statusColors[parcel.status] || "bg-gray-200 text-gray-700"
          }`}
        >
          {parcel.status}
        </span>
      ),
    },
    {
      header: "Blocked",
      accessor: (parcel) => (
        <span
          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] ${
            parcel.isBlocked
              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200"
          }`}
        >
          {parcel.isBlocked ? "YES" : "NO"}
        </span>
      ),
      mobileHidden: true,
    },
    {
      header: "Actions",
      accessor: (parcel) => (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetail(parcel)}>
            View
          </Button>
          <Button size="sm" onClick={() => onEdit(parcel)}>
            Edit
          </Button>
          <AskConfirmation onDelete={() => deleteParcelByAdmin(parcel._id)}>
            <Button size="sm" variant="destructive">
              Delete
            </Button>
          </AskConfirmation>
        </div>
      ),
      className: "min-w-[180px]",
    },
  ];

  return (
    <DashboardTable
      columns={columns}
      data={parcels}
      rowKey={(parcel) => parcel._id}
      emptyState={<span>No parcels available.</span>}
    />
  );
}
