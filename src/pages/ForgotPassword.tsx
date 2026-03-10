import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgotPasswordMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const emailCheckSchema = z.object({
  email: z.email({ message: "Enter a valid email address" }),
});

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const form = useForm<z.infer<typeof emailCheckSchema>>({
    resolver: zodResolver(emailCheckSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof emailCheckSchema>) {
    const toastId = toast.loading(
      `Sending password reset link to ${values.email}`
    );
    try {
      const res = await forgotPassword(values).unwrap();
      if (res?.success) {
        toast.success("Password reset link sent. Please check your email", {
          id: toastId,
        });
      }
      //
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message, { id: toastId });
    }
  }

  return (
    <main className="page-enter flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-8 lg:px-16">
      <div className="w-full max-w-md rounded-[2.5rem] border border-border/60 bg-card/90 p-8 shadow-2xl">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground/70">
            Recover access
          </p>
          <h1 className="text-3xl font-bold text-foreground">Forgot Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below and we will send a secure link so you can reset
            your password right away.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="email-form" className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                form="email-form"
                type="submit"
                className="w-full rounded-full"
              >
                Send reset link
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-6 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/20 to-secondary/20 p-4 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Need help?</p>
          <p>Reach our support team at support@delivraze.com.</p>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
