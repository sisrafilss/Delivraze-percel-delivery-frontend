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
    <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
      <div className="flex items-center gap-2">
        <Label className="sr-only">Search</Label>
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") apply();
          }}
          className="min-w-[220px]"
        />
      </div>

      <div className="flex items-center gap-2">
        <select
          value={verified}
          onChange={(e) => setVerified(e.target.value)}
          className="px-3 py-2 rounded-md border bg-transparent text-sm"
        >
          <option value="">All (Verified+Unverified)</option>
          <option value="true">Verified</option>
          <option value="false">Unverified</option>
        </select>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-3 py-2 rounded-md border bg-transparent text-sm"
        >
          <option value="">All roles</option>
          <option value="ADMIN">Admin</option>
          <option value="SENDER">Sender</option>
          <option value="RECEIVER">Receiver</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 rounded-md border bg-transparent text-sm"
        >
          <option value="">All status</option>
          <option value="ACTIVE">Active</option>
          <option value="BLOCKED">Blocked</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        <Button variant="outline" onClick={apply}>
          Apply
        </Button>
        <Button variant="ghost" onClick={clear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
