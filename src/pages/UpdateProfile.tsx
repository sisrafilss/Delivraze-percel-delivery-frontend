import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useUpdateProfileMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, { message: "Enter a valid phone number" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
});

type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

export default function UpdateProfilePage() {
  const [updateProfile] = useUpdateProfileMutation();
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (values: UpdateProfileFormValues) => {
    const toastId = toast.loading("Updating Profile...");
    try {
      const res = await updateProfile(values).unwrap();
      if (res?.success) {
        toast.success(res.message, {
          id: toastId,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error.data?.message, { id: toastId });
    }
  };

  useEffect(() => {
    if (!isLoading && userInfo?.data) {
      form.reset({
        name: userInfo?.data?.name,
        phone: userInfo?.data?.phone,
        address: userInfo?.data?.address,
      });
    }
  }, [form, isLoading, userInfo?.data]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      {isLoading ? (
        <Card className="w-full max-w-md shadow-lg rounded-2xl border border-border p-6 space-y-6">
          {/* Title skeleton */}
          <div className="flex justify-center">
            <Skeleton className="h-6 w-40" />
          </div>

          {/* Form fields skeleton */}
          <div className="space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>

          {/* Submit button skeleton */}
          <Skeleton className="h-10 w-full rounded-md" />
        </Card>
      ) : (
        <Card className="w-full max-w-md shadow-lg rounded-2xl border border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center text-primary">
              Update Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+8801XXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address Field */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  Save Changes
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
