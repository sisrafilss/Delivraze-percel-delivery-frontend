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
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2 rounded-md border border-border bg-background text-sm"
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
        className="max-w-sm"
      />
    </div>
  );
}
