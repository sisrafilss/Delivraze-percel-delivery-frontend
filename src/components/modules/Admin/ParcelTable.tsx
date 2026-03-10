import AskConfirmation from "@/components/AskConfirmation";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="dashboard-table-scroll">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-0">
          <thead className="bg-muted/50 text-sm text-muted-foreground">
            <tr>
              <th className="px-3 py-2 text-left">Tracking</th>
              <th className="px-3 py-2 text-left">Sender</th>
              <th className="px-3 py-2 text-left">Receiver</th>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Blocked</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((p) => (
              <tr
                key={p._id}
                className="border-b border-border bg-white/80 transition hover:bg-secondary/10 dark:bg-slate-900/70 dark:hover:bg-secondary/20"
              >
                <td className="px-3 py-2 text-sm">{p.trackingId}</td>
                <td className="px-3 py-2 text-sm">{p.senderEmail}</td>
                <td className="px-3 py-2 text-sm">{p.receiverEmail}</td>
                <td className="px-3 py-2 text-sm">{p.parcelType}</td>
                <td className="px-3 py-2 text-sm">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] ${
                      statusColors[p.status] || "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-sm">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] ${
                      p.isBlocked
                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200"
                    }`}
                  >
                    {p.isBlocked ? "YES" : "NO"}
                  </span>
                </td>
                <td className="px-3 py-2 text-sm flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => onViewDetail(p)}>
                    View
                  </Button>
                  <Button size="sm" onClick={() => onEdit(p)}>
                    Edit
                  </Button>
                  <AskConfirmation onDelete={() => deleteParcelByAdmin(p._id)}>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </AskConfirmation>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
