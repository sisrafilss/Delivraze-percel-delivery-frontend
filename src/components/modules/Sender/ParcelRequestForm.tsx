import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useParcelSendRequestMutation } from "@/redux/features/parcel/sender.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

// ✅ Schema
const parcelRequestSchema = z.object({
  receiverName: z.string().min(2, "Receiver name is required"),
  receiverPhone: z.string().regex(/^(\+8801[3-9]\d{8})$/, {
    message: "Enter a valid Bangladeshi phone number (+8801...)",
  }),
  receiverAddress: z.string().min(5, "Receiver address is required"),
  receiverEmail: z.string().email("Invalid email address"),
  parcelType: z.string().min(1, "Parcel type is required"),
  weight: z.number().positive("Weight must be a positive number"),
  specialInstructions: z.string().optional(),
  pickupLocation: z.string().min(2, "Pickup location is required"),
  dropoffLocation: z.string().min(2, "Dropoff location is required"),
});

type ParcelRequestFormValues = z.infer<typeof parcelRequestSchema>;

export function ParcelRequestForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [parcelSendRequest] = useParcelSendRequestMutation();
  const { data: userInfo } = useUserInfoQuery(undefined);

  console.log("User info", userInfo);
  // ✅ Ensure correct type
  const form = useForm<ParcelRequestFormValues>({
    resolver: zodResolver(parcelRequestSchema),
    defaultValues: {
      receiverName: "John Doe",
      receiverPhone: "+8801712345678",
      receiverAddress: "House 12, Road 7, Dhanmondi, Dhaka",
      receiverEmail: "israfilhossen3@gmail.com",
      parcelType: "Electronics",
      weight: 1500,
      specialInstructions: "Handle with care, fragile item inside",
      pickupLocation: "Banani, Dhaka",
      dropoffLocation: "Uttara, Dhaka",
    },
  });

  async function onSubmit(values: ParcelRequestFormValues) {
    const toastId = toast.loading("Parcel Send Request Submitting...");
    try {
      const parcelInfo = {
        senderId: userInfo?.data?._id,
        ...values,
      };
      const res = await parcelSendRequest(parcelInfo).unwrap();
      if (res?.success) {
        console.log("PARCEL CREATED API RESPONSE:", res.data);
        toast.success("Parcel Send Request Submitted Successfully", {
          id: toastId,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error.data?.message, { id: toastId });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 bg-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Send a Parcel</CardTitle>
          <CardDescription>
            Fill out the form to request a parcel delivery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                {/* receiverName */}
                <FormField
                  control={form.control}
                  name="receiverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* receiverPhone */}
                <FormField
                  control={form.control}
                  name="receiverPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+8801XXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* receiverEmail */}
                <FormField
                  control={form.control}
                  name="receiverEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver Email</FormLabel>
                      <FormControl>
                        <Input placeholder="receiver@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* receiverAddress */}
                <FormField
                  control={form.control}
                  name="receiverAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="House 12, Road 7, Dhanmondi, Dhaka"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* parcelType */}
                <FormField
                  control={form.control}
                  name="parcelType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parcel Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Documents">Documents</SelectItem>
                          <SelectItem value="Electronics">
                            Electronics
                          </SelectItem>
                          <SelectItem value="Books">Books</SelectItem>
                          <SelectItem value="Clothes">Clothes</SelectItem>
                          <SelectItem value="Clothes">Clothes</SelectItem>
                          <SelectItem value="Cosmetics">Cosmetics</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>

                        {/* export enum ParcelType {
  DOCUMENTS = "Documents",
  CLOTHES = "Clothes",
  BOOKS = "Books",
  COSMETICS = "Cosmetics",
  TOYS = "Toys",
  ELECTRONICS = "Electronics",
} */}
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* weight */}
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (grams)</FormLabel>
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

                {/* pickupLocation */}
                <FormField
                  control={form.control}
                  name="pickupLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Banani, Dhaka" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* dropoffLocation */}
                <FormField
                  control={form.control}
                  name="dropoffLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dropoff Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Uttara, Dhaka" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* specialInstructions */}
                <FormField
                  control={form.control}
                  name="specialInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Instructions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Handle with care, fragile item inside"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Submit Request
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
