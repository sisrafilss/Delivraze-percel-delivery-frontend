import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const registerFormSchema = z
  .object({
    name: z
      .string()
      .max(50, { message: "Name should be less than 50 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
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
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" }),
    role: z.enum(["SENDER", "RECEIVER"], {
      message: "You must choose either Sender or Receiver",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      const res = await register(values).unwrap();
      if (res?.success) {
        toast.success("Registration Successfull");
        navigate("/verify", { state: values.email });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error.data?.message);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 bg-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Signup Your Account</CardTitle>
          <CardDescription>
            Enter your details to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                {/* name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* role */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SENDER">Sender</SelectItem>
                          <SelectItem value="RECEIVER">Receiver</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* confirm password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Confirm Password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
