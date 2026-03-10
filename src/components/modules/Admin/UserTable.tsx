import AskConfirmation from "@/components/AskConfirmation";
import { DashboardTable } from "@/components/ui/dashboard-table";
import type { DashboardTableColumn } from "@/components/ui/dashboard-table";
import { useUpdateUserByAdminMutation } from "@/redux/features/admin/user.api";
import type { User } from "@/types";
import { toast } from "sonner";
import UserStatusToggle from "./UserStatusToggle";

type Props = {
  users: User[];
  loading?: boolean;
  onView: (u: User) => void;
  onRefetch: () => void;
};

const statusBadge = (status: string) => {
  const statusClasses: Record<string, string> = {
    ACTIVE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200",
    INACTIVE: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
    BLOCKED: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200",
  };
  return statusClasses[status] || "bg-muted text-foreground";
};

const roleBadge = (role: string) => {
  const colorMap: Record<string, string> = {
    ADMIN: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
    RECEIVER: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200",
    SENDER: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200",
  };
  return colorMap[role] || "bg-muted text-foreground";
};

export default function UserTable({ users, loading, onView, onRefetch }: Props) {
  const columns: DashboardTableColumn<User>[] = [
    { header: "Name", accessor: (user) => user.name },
    { header: "Email", accessor: (user) => user.email, mobileHidden: true },
    {
      header: "Role",
      accessor: (user) => (
        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] ${roleBadge(user.role)}`}>
          {user.role}
        </span>
      ),
      mobileHidden: true,
    },
    {
      header: "Status",
      accessor: (user) => (
        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] ${statusBadge(user.isActive)}`}>
          {user.isActive}
        </span>
      ),
    },
    {
      header: "Verified",
      accessor: (user) => (
        <span
          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] ${user.isVerified ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200" : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"}`}
        >
          {user.isVerified ? "Yes" : "No"}
        </span>
      ),
      mobileHidden: true,
    },
    {
      header: "Joined",
      accessor: (user) => new Date(user.createdAt).toLocaleDateString(),
      mobileHidden: true,
    },
    {
      header: "Actions",
      accessor: (user) => (
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-full border border-border px-3 py-1 text-sm"
            onClick={() => onView(user)}
          >
            View
          </button>

          <UserStatusToggle user={user} onRefetch={onRefetch} />

          <DeleteUserButton userId={user._id} onRefetch={onRefetch} />
        </div>
      ),
      className: "min-w-[160px]",
    },
  ];

  const emptyState = <span>No users found.</span>;

  return (
    <DashboardTable
      columns={columns}
      data={users || []}
      loading={loading}
      rowKey={(user) => user._id}
      emptyState={emptyState}
    />
  );
}

function DeleteUserButton({
  userId,
  onRefetch,
}: {
  userId: string;
  onRefetch: () => void;
}) {
  const [updateUserByAdmin, { isLoading }] = useUpdateUserByAdminMutation();
  const onDelete = async () => {
    try {
      const res = await updateUserByAdmin({
        userId: userId,
        userInfo: { isDeleted: true },
      }).unwrap();
      onRefetch();

      if (res?.success) {
        toast.success("User deleted");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user");
    }
  };

  return (
    <AskConfirmation onDelete={onDelete}>
      <button
        className="rounded-full border border-red-200 px-3 py-1 text-sm text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-300"
        disabled={isLoading}
      >
        Delete
      </button>
    </AskConfirmation>
  );
}
