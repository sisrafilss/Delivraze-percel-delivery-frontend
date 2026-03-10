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
import { Spinner } from "@/components/ui/spinner";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, KeyRound, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "Current password must be at least 6 characters",
    }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    const toastId = toast.loading("Changing password...");
    try {
      const res = await changePassword({
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      }).unwrap();
      if (res?.success) {
        toast.success(res.message || "Password changed successfully!", {
          id: toastId,
        });
        form.reset();
      }
    } catch (error) {
      console.error(error);
      const err = error as Record<string, unknown>;
      const message = err?.data && typeof err.data === 'object' 
        ? (err.data as Record<string, unknown>)?.message 
        : "Failed to change password";
      toast.error(String(message), {
        id: toastId,
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Change Password</h1>
        <p className="text-muted-foreground mt-1">
          Update your password to keep your account secure
        </p>
      </div>

      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Password Settings
          </CardTitle>
          <CardDescription>
            Enter your current password and choose a new one
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
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Current Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <KeyRound className="h-4 w-4" />
                      New Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <KeyRound className="h-4 w-4" />
                      Confirm Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" />
                    Changing...
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    Change Password
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
