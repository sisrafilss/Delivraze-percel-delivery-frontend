/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/admin/users/components/UserStatusToggle.tsx
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useUpdateProfileMutation } from "@/redux/features/auth/auth.api";
import type { User } from "@/types";

export default function UserStatusToggle({
  user,
  onRefetch,
}: {
  user: User;
  onRefetch: () => void;
}) {
  const [updateUserStatus, { isLoading }] = useUpdateProfileMutation();
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    const next = user.isActive === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    const confirmText =
      next === "BLOCKED" ? "Block this user?" : "Unblock this user?";
    if (!window.confirm(confirmText)) return;

    try {
      setBusy(true);
      await updateUserStatus({ id: user._id, status: next }).unwrap();
      onRefetch();
      // optionally show toast
    } catch (err) {
      console.error(err);
      alert("Failed to update user status");
    } finally {
      setBusy(false);
    }
  };

  const label = user.isActive === "ACTIVE" ? "Block" : "Unblock";
  const variant = user.isActive === "ACTIVE" ? "destructive" : "default";

  return (
    <Button
      size="sm"
      variant={variant as any}
      onClick={toggle}
      disabled={busy || isLoading}
    >
      {busy || isLoading ? "Working..." : label}
    </Button>
  );
}
