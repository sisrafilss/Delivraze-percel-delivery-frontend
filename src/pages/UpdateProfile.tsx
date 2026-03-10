import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { User, Phone, MapPin, Save } from "lucide-react";
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
    } catch (error) {
      console.error(error);
      const err = error as Record<string, unknown>;
      const message = err?.data && typeof err.data === 'object' 
        ? (err.data as Record<string, unknown>)?.message 
        : "Failed to update profile";
      toast.error(String(message), { id: toastId });
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
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Update Profile</h1>
        <p className="text-muted-foreground mt-1">
          Keep your information up to date
        </p>
      </div>

      {isLoading ? (
        <Card className="card-modern">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal details below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+8801XXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full gap-2"
                >
                  <Save className="w-4 h-4" />
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
