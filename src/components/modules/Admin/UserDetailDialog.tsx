// src/pages/admin/users/components/UserDetailDialog.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { User } from "@/types";
import UserStatusToggle from "./UserStatusToggle";

type Props = {
  user: User;
  open: boolean;
  onClose: () => void;
  onRefetch: () => void;
};

export default function UserDetailDialog({
  user,
  open,
  onClose,
  onRefetch,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <div className="font-medium">{user.name}</div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <div className="font-medium">{user.email}</div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <div className="font-medium">{user.phone ?? "—"}</div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <div className="font-medium">{user.address ?? "—"}</div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <div className="font-medium">{user.role}</div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <div className="font-medium">{user.isActive}</div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Verified</p>
            <div className="font-medium">{user.isVerified ? "Yes" : "No"}</div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Joined</p>
            <div className="font-medium">
              {new Date(user.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 mt-6">
          <UserStatusToggle user={user} onRefetch={onRefetch} />
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
