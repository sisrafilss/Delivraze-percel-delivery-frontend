import AskConfirmation from "@/components/AskConfirmation";
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

export default function UserTable({
  users,
  loading,
  onView,
  onRefetch,
}: Props) {
  if (loading) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground">
        Loading users...
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground">
        No users found.
      </div>
    );
  }

  return (
    <div className="dashboard-table-scroll">
      <div className="overflow-x-auto">
        <table className="min-w-[720px] table-auto border-separate border-spacing-0">
          <thead className="bg-muted/50 text-sm text-muted-foreground">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Role</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Verified</th>
              <th className="px-3 py-2 text-left">Joined</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-y border-border bg-white/80 transition hover:bg-secondary/10 dark:bg-slate-900/70 dark:hover:bg-secondary/20"
              >
                <td className="px-3 py-3 text-sm">{u.name}</td>
                <td className="px-3 py-3 text-sm">{u.email}</td>
                <td className="px-3 py-3 text-sm">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] ${
                      u.role === "ADMIN"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        : u.role === "RECEIVER"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200"
                        : u.role === "SENDER"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-3 py-3 text-sm">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] ${
                      u.isActive === "ACTIVE"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200"
                        : u.isActive === "INACTIVE"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                        : u.isActive === "BLOCKED"
                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {u.isActive}
                  </span>
                </td>
                <td className="px-3 py-3 text-sm">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] ${
                      u.isVerified
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {u.isVerified ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-3 py-3 text-sm">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-3 text-sm flex gap-2">
                  <button
                    className="rounded-full border border-border px-3 py-1 text-sm"
                    onClick={() => onView(u)}
                  >
                    View
                  </button>

                  <UserStatusToggle user={u} onRefetch={onRefetch} />

                  <DeleteUserButton userId={u._id} onRefetch={onRefetch} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
