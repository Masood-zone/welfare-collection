import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUserStore } from "@/store/use-user.store";
import { useUpdateUser } from "@/pages/auth/services/queries";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Account() {
  const { user } = useUserStore();
  const { mutateAsync: updateUser, isPending } = useUpdateUser();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: user ? user : {},
  });
  async function onSubmit(values: FormValues) {
    try {
      await updateUser({
        id: user?.id ?? "",
        data: { ...values },
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Edit your name/username"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your email address for notifications.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
