/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateParcelByAdminMutation } from "@/redux/features/parcel/admin.api";
// import { useUpdateParcelMutation } from "@/redux/api/parcelApi"; // adjust path
import React from "react";
import { useForm } from "react-hook-form";

type ParcelFormModalProps = {
  open: boolean;
  onClose: () => void;
  parcel: any | null; // type properly with Parcel type
};

export const ParcelFormModal: React.FC<ParcelFormModalProps> = ({
  open,
  onClose,
  parcel,
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: parcel || {},
  });

  const [updateParcel, { isLoading }] = useUpdateParcelByAdminMutation();

  React.useEffect(() => {
    reset(parcel || {});
  }, [parcel, reset]);

  const onSubmit = async (data: any) => {
    try {
      await updateParcel({ parcelId: parcel._id, ...data }).unwrap();
      onClose();
    } catch (err) {
      console.error("Failed to update parcel", err);
    }
  };

  if (!parcel) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Edit Parcel</DialogTitle>
          <DialogDescription>
            Update parcel information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="receiverName">Receiver Name</Label>
            <Input id="receiverName" {...register("receiverName")} />
          </div>
          <div>
            <Label htmlFor="receiverPhone">Receiver Phone</Label>
            <Input id="receiverPhone" {...register("receiverPhone")} />
          </div>
          <div>
            <Label htmlFor="receiverAddress">Receiver Address</Label>
            <Input id="receiverAddress" {...register("receiverAddress")} />
          </div>
          <div>
            <Label htmlFor="parcelType">Parcel Type</Label>
            <Input id="parcelType" {...register("parcelType")} />
          </div>
          <div>
            <Label htmlFor="weight">Weight (g)</Label>
            <Input id="weight" type="number" {...register("weight")} />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Input id="status" {...register("status")} />
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
