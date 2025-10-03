// src/pages/admin/users/components/UserTable.tsx

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
      <div className="p-6">
        <div className="text-center text-sm text-muted-foreground">
          Loading users...
        </div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center text-sm text-muted-foreground">
          No users found.
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] table-auto">
        <thead className="bg-muted sticky top-0">
          <tr>
            <th className="p-3 text-left text-sm">Name</th>
            <th className="p-3 text-left text-sm">Email</th>
            <th className="p-3 text-left text-sm">Role</th>
            <th className="p-3 text-left text-sm">Status</th>
            <th className="p-3 text-left text-sm">Verified</th>
            <th className="p-3 text-left text-sm">Joined</th>
            <th className="p-3 text-left text-sm">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t last:border-b">
              <td className="p-3 text-sm">{u.name}</td>
              <td className="p-3 text-sm">{u.email}</td>
              <td className="p-3 text-sm">
                <span
                  className={
                    "inline-block px-2 py-1 rounded-md text-xs font-medium " +
                    (u.role === "ADMIN"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : u.role === "USER"
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
                      : u.role === "RECEIVER"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200"
                      : "bg-muted text-foreground")
                  }
                >
                  {u.role}
                </span>
              </td>
              <td className="p-3 text-sm">
                <span
                  className={
                    "inline-block px-2 py-1 rounded-md text-xs font-medium " +
                    (u.isActive === "ACTIVE"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                      : u.isActive === "INACTIVE"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                      : u.isActive === "BLOCKED"
                      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                      : "bg-muted text-foreground")
                  }
                >
                  {u.isActive}
                </span>
              </td>
              <td className="p-3 text-sm">
                <span
                  className={
                    "inline-block px-2 py-1 rounded-md text-xs font-medium " +
                    (u.isVerified
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200")
                  }
                >
                  {u.isVerified ? "Yes" : "No"}
                </span>
              </td>
              <td className="p-3 text-sm">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
              <td className="p-3 text-sm flex gap-2">
                <button
                  className="px-3 py-1 rounded-md border text-sm"
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
      console.log(res);
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
        className="px-3 py-1 rounded-md border text-sm text-red-600 disabled:opacity-50"
        disabled={isLoading}
      >
        Delete
      </button>
    </AskConfirmation>
  );
}
