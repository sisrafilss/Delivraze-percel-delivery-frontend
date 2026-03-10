import { Input } from "@/components/ui/input";

const STATUS_OPTIONS = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "In Transit", value: "IN_TRANSIT" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

interface Props {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  searchEmail: string;
  onEmailChange: (email: string) => void;
}

export default function ParcelFilters({
  selectedStatus,
  onStatusChange,
  searchEmail,
  onEmailChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full sm:w-auto rounded-full border border-border bg-white px-4 py-2 text-sm text-foreground shadow-sm transition focus:border-primary focus:ring-1 focus:ring-primary/40"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <Input
        type="email"
        placeholder="Search by sender/receiver email"
        value={searchEmail}
        onChange={(e) => onEmailChange(e.target.value)}
        className="w-full rounded-full border border-border bg-white/70 px-4 py-2 text-sm shadow-sm"
      />
    </div>
  );
}
