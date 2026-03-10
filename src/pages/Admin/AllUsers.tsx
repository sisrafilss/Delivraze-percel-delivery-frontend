import Pagination from "@/components/Pagination";
import UserDetailDialog from "@/components/modules/Admin/UserDetailDialog";
import UserFilters from "@/components/modules/Admin/UserFilters";
import UserTable from "@/components/modules/Admin/UserTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useGetAllUsersByAdminQuery } from "@/redux/features/admin/user.api";
import type { User } from "@/types";

export default function AllUsers() {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isVerified, setIsVerified] = useState<string>("");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      searchTerm: search || undefined,
      role: role || undefined,
      isActive: status || undefined,
      isVerified: isVerified || undefined,
    }),
    [page, limit, search, role, status, isVerified]
  );

  const { data, isLoading, isFetching, refetch } =
    useGetAllUsersByAdminQuery(queryParams);

  const users = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage accounts, block/unblock, or delete records
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="card-modern">
        <div className="p-4 border-b border-border">
          {isLoading ? (
            <div className="flex gap-3 flex-wrap">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-20" />
            </div>
          ) : (
            <UserFilters
              initialSearch={search}
              initialRole={role}
              initialStatus={status}
              initalIsVerified={isVerified}
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
              onVerified={(v) => {
                setIsVerified(v);
                setPage(1);
              }}
              onClear={() => {
                setSearch("");
                setRole("");
                setStatus("");
                setIsVerified("");
                setPage(1);
              }}
            />
          )}
        </div>

        <div className="p-4">
          <UserTable
            users={users}
            loading={isLoading}
            onView={(u) => setSelectedUser(u)}
            onRefetch={() => refetch()}
          />
        </div>

        {meta && meta.totalPage > 1 && (
          <div className="flex justify-end p-4 border-t border-border">
            <Pagination
              page={meta.page}
              totalPages={meta.totalPage}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        )}
      </div>

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
