import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateMember } from "@/pages/admin/services/members/queries";
import { CustomButton } from "@/pages/admin/components/button/custom-button";
import { Edit } from "lucide-react";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().min(10).max(10).optional(),
  password: z.string().optional(),
});

export default function EditMemberForm({ member }: { member: UpdateUser }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: member,
  });

  const { mutateAsync: updateMember, isPending } = useUpdateMember();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateMember({ ...values, id: member.id });
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Member Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter member full name"
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
              <FormLabel>Member Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Member email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is the member's email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter member phone number"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the member's phone number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton
          variant="default"
          isLoading={isPending}
          icon={<Edit className="h-4 w-4" />}
        >
          Update Member
        </CustomButton>
      </form>
    </Form>
  );
}
