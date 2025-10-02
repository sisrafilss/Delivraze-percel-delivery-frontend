/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/admin/users/components/UserStatusToggle.tsx

import AskConfirmation from "@/components/AskConfirmation";
import { Button } from "@/components/ui/button";
import { useUpdateUserByAdminMutation } from "@/redux/features/admin/user.api";
import type { User } from "@/types";
import { toast } from "sonner";

export default function UserStatusToggle({
  user,
  onRefetch,
}: {
  user: User;
  onRefetch: () => void;
}) {
  const [updateUserByAdmin, { isLoading }] = useUpdateUserByAdminMutation();
  const next = user.isActive === "ACTIVE" ? "BLOCKED" : "ACTIVE";
  const toggle = async () => {
    try {
      const res = await updateUserByAdmin({
        userId: user._id,
        userInfo: { isActive: next },
      }).unwrap();

      onRefetch();
      if (res.success) {
        toast.success(
          `User successfully ${next === "ACTIVE" ? "Unblocked" : next}!`
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user status");
    }
  };

  const label = user.isActive === "ACTIVE" ? "Block" : "Unblock";
  const variant = user.isActive === "ACTIVE" ? "destructive" : "default";

  return (
    <AskConfirmation
      description={
        next === "BLOCKED" ? "Block this user?" : "Unblock this user?"
      }
      onDelete={toggle}
    >
      <Button size="sm" variant={variant as any} disabled={isLoading}>
        {label}
      </Button>
    </AskConfirmation>
  );
}
