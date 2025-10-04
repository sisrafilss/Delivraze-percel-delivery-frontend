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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useUpdateParcelByAdminMutation } from "@/redux/features/parcel/admin.api";
// import { useUpdateParcelByAdminMutation } from "@/redux/features/parcel/admin.api";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ✅ Status options
const ParcelStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  IN_TRANSIT: "IN_TRANSIT",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

type ParcelStatusType = (typeof ParcelStatus)[keyof typeof ParcelStatus];

// ✅ Validation schema
const parcelFormSchema = z.object({
  receiverName: z.string().min(1, "Receiver name is required"),
  receiverPhone: z.string().min(1, "Receiver phone is required"),
  receiverAddress: z.string().min(1, "Receiver address is required"),
  parcelType: z.string().min(1, "Parcel type is required"),
  weight: z.number().positive("Weight must be a positive number"),
  status: z.enum([
    ParcelStatus.PENDING,
    ParcelStatus.ACCEPTED,
    ParcelStatus.IN_TRANSIT,
    ParcelStatus.DELIVERED,
    ParcelStatus.CANCELLED,
  ]),
  location: z.string({ message: "Location is required" }),
  note: z.string({ message: "Please enter a note" }),
  isBlocked: z.boolean(),
});

type ParcelFormValues = z.infer<typeof parcelFormSchema>;

type ParcelFormModalProps = {
  open: boolean;
  onClose: () => void;
  parcel: any | null; // TODO: replace with Parcel type
};

export const ParcelFormModal: React.FC<ParcelFormModalProps> = ({
  open,
  onClose,
  parcel,
}) => {
  const [updateParcel, { isLoading }] = useUpdateParcelByAdminMutation();

  const form = useForm<ParcelFormValues>({
    resolver: zodResolver(parcelFormSchema),
    defaultValues: {
      receiverName: "",
      receiverPhone: "",
      receiverAddress: "",
      parcelType: "",
      weight: 0,
      status: ParcelStatus.PENDING,
      location: "",
      note: "",
      isBlocked: false,
    },
  });

  // Populate form when parcel is passed
  useEffect(() => {
    if (parcel) {
      form.reset({
        receiverName: parcel.receiverName || "",
        receiverPhone: parcel.receiverPhone || "",
        receiverAddress: parcel.receiverAddress || "",
        parcelType: parcel.parcelType || "",
        weight: parcel.weight || 0,
        status: parcel.status as ParcelStatusType,
        isBlocked: parcel.isBlocked || false,
      });
    }
  }, [parcel, form]);

  const onSubmit = async (values: ParcelFormValues) => {
    try {
      await updateParcel({ parcelId: parcel._id, ...values }).unwrap();
      onClose();
    } catch (err) {
      console.error("Failed to update parcel", err);
    }
  };

  if (!parcel) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Parcel</DialogTitle>
          <DialogDescription>
            Update receiver and parcel details. Sender info is readonly.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Sender Info (Readonly) */}
            <div className="rounded-lg border p-4 bg-muted/30 space-y-3">
              <h3 className="text-sm font-semibold">Sender Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <FormLabel>Name</FormLabel>
                  <Input value={parcel.senderName} disabled />
                </div>
                <div>
                  <FormLabel>Email</FormLabel>
                  <Input value={parcel.senderEmail} disabled />
                </div>
                <div>
                  <FormLabel>Phone</FormLabel>
                  <Input value={parcel.senderPhone} disabled />
                </div>
                <div className="sm:col-span-2">
                  <FormLabel>Address</FormLabel>
                  <Input value={parcel.senderAddress} disabled />
                </div>
              </div>
            </div>

            {/* Receiver Name */}
            <FormField
              control={form.control}
              name="receiverName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter receiver name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Receiver Phone */}
            <FormField
              control={form.control}
              name="receiverPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter receiver phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Receiver Address */}
            <FormField
              control={form.control}
              name="receiverAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter receiver address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Parcel Type */}
            <FormField
              control={form.control}
              name="parcelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parcel Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter parcel type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (g)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1500"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Delivery Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(ParcelStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* hub location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hub Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Dhaka" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* note */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Received in the hub. Will go to the next hub soon"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Block/Unblock */}
            <FormField
              control={form.control}
              name="isBlocked"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-md border p-3">
                  <FormLabel>Blocked</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
