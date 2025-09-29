// src/pages/admin/users/components/UserTable.tsx

import type { User } from "@/types";
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
                <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-slate-100">
                  {u.role}
                </span>
              </td>
              <td className="p-3 text-sm">{u.isActive}</td>
              <td className="p-3 text-sm">{u.isVerified ? "Yes" : "No"}</td>
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

/* Small inline Delete button component that uses RTK mutation (assumed) */
// import { useDeleteUserMutation } from "@/services/adminApi"; // <- adjust hook/path
function DeleteUserButton({
  userId,
  onRefetch,
}: {
  userId: string;
  onRefetch: () => void;
}) {
  //   const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const onDelete = async () => {
    const ok = window.confirm(
      "Delete this user permanently? This action cannot be undone."
    );
    if (!ok) return;
    try {
      //   await deleteUser(userId).unwrap();
      onRefetch();
      alert("User deleted"); // replace with a toast if you have one
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  return (
    <button
      className="px-3 py-1 rounded-md border text-sm text-red-600 disabled:opacity-50"
      onClick={onDelete}
      //   disabled={isLoading}
    >
      Delete
    </button>
  );
}
