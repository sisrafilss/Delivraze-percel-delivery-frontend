import Pagination from "@/components/Pagination";
import UserDetailDialog from "@/components/modules/Admin/UserDetailDialog";
import UserFilters from "@/components/modules/Admin/UserFilters";
import UserTable from "@/components/modules/Admin/UserTable";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

import { useGetAllUsersByAdminQuery } from "@/redux/features/admin/user.api";
import type { User } from "@/types";

export default function AllUsers() {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      searchTerm: search || undefined,
      role: role || undefined,
      isActive: status || undefined,
    }),
    [page, limit, search, role, status]
  );

  const { data, isLoading, isFetching, refetch } =
    useGetAllUsersByAdminQuery(queryParams);

  const users = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">All Users</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage users — view details, block/unblock, or delete.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <UserFilters
            initialSearch={search}
            initialRole={role}
            initialStatus={status}
            onSearch={(s) => {
              setSearch(s);
              setPage(1);
            }}
            onRole={(r) => {
              setRole(r);
              setPage(1);
            }}
            onStatus={(s) => {
              setStatus(s);
              setPage(1);
            }}
            onClear={() => {
              setSearch("");
              setRole("");
              setStatus("");
              setPage(1);
            }}
          />
          <Button onClick={() => refetch()} disabled={isFetching}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="bg-card border rounded-lg">
        <UserTable
          users={users}
          loading={isLoading}
          onView={(u) => setSelectedUser(u)}
          onRefetch={() => refetch()}
        />
      </div>

      {meta && meta.totalPage > 1 && (
        <div className="mt-4 flex justify-end">
          <Pagination
            page={meta.page}
            totalPages={meta.totalPage}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}

      {selectedUser && (
        <UserDetailDialog
          user={selectedUser}
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          onRefetch={() => refetch()}
        />
      )}
    </div>
  );
}
