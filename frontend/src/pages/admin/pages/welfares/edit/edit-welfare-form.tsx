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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateWelfare } from "@/pages/admin/services/welfare/queries";
import { CustomButton } from "@/pages/admin/components/button/custom-button";
import { Edit } from "lucide-react";

const formSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  amount: z.coerce.number().min(1).max(100000).optional(),
  paymentCycle: z.enum(["MONTHLY", "WEEKLY", "DAILY"]).optional(),
});

export default function EditWelfareForm({
  welfare,
}: {
  welfare: UpdateWelfareProgram;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: welfare,
  });

  const { mutateAsync: updateWelfare, isPending } = useUpdateWelfare();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateWelfare({
        id: welfare.id ?? "",
        data: values,
      });
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter welfare program title"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the welfare's public display name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description for welfare program"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The description of the welfare program (provide a summary of
                your cause).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter amount" type="number" {...field} />
              </FormControl>
              <FormDescription>
                This is the amount of money you expect your members to pay.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentCycle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Cycle</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment cycle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MONTHLY">MONTHLY</SelectItem>
                  <SelectItem value="WEEKLY">WEEKLY</SelectItem>
                  <SelectItem value="DAILY">DAILY</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This is the frequency of payments to be made by members
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton
          type="submit"
          isLoading={isPending}
          icon={<Edit className="h-4 w-4" />}
        >
          Update Welfare
        </CustomButton>
      </form>
    </Form>
  );
}
