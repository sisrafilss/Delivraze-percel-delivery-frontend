// src/pages/admin/users/components/UserFilters.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type Props = {
  initialSearch?: string;
  initialRole?: string;
  initialStatus?: string;
  initalIsVerified?: string;
  onSearch: (value: string) => void;
  onRole: (value: string) => void;
  onStatus: (value: string) => void;
  onVerified: (value: string) => void;
  onClear: () => void;
};

export default function UserFilters({
  initialSearch = "",
  initialRole = "",
  initialStatus = "",
  initalIsVerified = "",
  onSearch,
  onRole,
  onStatus,
  onVerified,
  onClear,
}: Props) {
  const [search, setSearch] = useState(initialSearch);
  const [role, setRole] = useState(initialRole);
  const [status, setStatus] = useState(initialStatus);
  const [verified, setVerified] = useState(initalIsVerified);

  const apply = () => {
    onSearch(search.trim());
    onRole(role);
    onStatus(status);
    onVerified(verified);
  };

  const clear = () => {
    setSearch("");
    setRole("");
    setStatus("");
    setVerified("");
    onClear();
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Label className="sr-only">Search</Label>
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") apply();
          }}
          className="min-w-[180px] flex-1 sm:flex-none rounded-full border border-border bg-white/70 px-4 py-2 text-sm shadow-sm"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <select
          value={verified}
          onChange={(e) => setVerified(e.target.value)}
          className="w-full sm:w-auto rounded-full border border-border bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
        >
          <option value="">All (Verified+Unverified)</option>
          <option value="true">Verified</option>
          <option value="false">Unverified</option>
        </select>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full sm:w-auto rounded-full border border-border bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
        >
          <option value="">All roles</option>
          <option value="ADMIN">Admin</option>
          <option value="SENDER">Sender</option>
          <option value="RECEIVER">Receiver</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full sm:w-auto rounded-full border border-border bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
        >
          <option value="">All status</option>
          <option value="ACTIVE">Active</option>
          <option value="BLOCKED">Blocked</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <Button variant="outline" onClick={apply} className="flex-1 sm:flex-none">
            Apply
          </Button>
          <Button variant="ghost" onClick={clear} className="flex-1 sm:flex-none">
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
