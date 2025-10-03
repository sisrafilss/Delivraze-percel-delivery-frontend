import Pagination from "@/components/Pagination";
import UserDetailDialog from "@/components/modules/Admin/UserDetailDialog";
import UserFilters from "@/components/modules/Admin/UserFilters";
import UserTable from "@/components/modules/Admin/UserTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, useState } from "react";

import { LazyLoadWrapper } from "@/components/LazyLoadWrapper";
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
    <LazyLoadWrapper>
      <div className="p-6">
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">All Users</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage users — view details, block/unblock, or delete.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isLoading ? (
              <>
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-20" />
              </>
            ) : (
              <>
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
                <Button onClick={() => refetch()} disabled={isFetching}>
                  Refresh
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Table Area */}
        <div className="bg-card border rounded-lg">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {/* Simulate 5 table rows skeleton */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 border-b last:border-0 pb-3"
                >
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-20 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <UserTable
              users={users}
              loading={isLoading}
              onView={(u) => setSelectedUser(u)}
              onRefetch={() => refetch()}
            />
          )}
        </div>

        {/* Pagination */}
        {meta && meta.totalPage > 1 && !isLoading && (
          <div className="mt-4 flex justify-end">
            <Pagination
              page={meta.page}
              totalPages={meta.totalPage}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        )}

        {/* User Detail Modal */}
        {selectedUser && (
          <UserDetailDialog
            user={selectedUser}
            open={!!selectedUser}
            onClose={() => setSelectedUser(null)}
            onRefetch={() => refetch()}
          />
        )}
      </div>
    </LazyLoadWrapper>
  );
}
