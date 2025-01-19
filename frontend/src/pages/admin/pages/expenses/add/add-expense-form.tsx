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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Link, useParams } from "react-router-dom";
import { useCreateWelfareProgramExpense } from "@/pages/admin/services/expenses/queries";
import { CustomButton } from "@/pages/admin/components/button/custom-button";
import { Save } from "lucide-react";
import { useUserStore } from "@/store/use-user.store";

const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z
    .number()
    .min(1, "Amount must be at least 1")
    .max(100000, "Amount must not exceed 100,000"),
});

export default function AddExpenseForm() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUserStore();
  const userId = user?.id;
  const { mutateAsync: createExpense, isPending } =
    useCreateWelfareProgramExpense();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createExpense({
        ...values,
        welfareProgramId: id ?? "",
        recordedBy: userId ?? "",
      });
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <div className="max-w-3xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Create Expense</h1>
        <Link
          to={`/admin/expenses/${id}`}
          className="text-primary hover:underline"
        >
          Back to Expenses
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Setup an expense"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A description of what the expense is being used for
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
                  <Input
                    placeholder="Expense amount"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>This is amount of expense</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomButton
            type="submit"
            disabled={isPending}
            icon={<Save size={16} className="mr-2" />}
          >
            Setup Expense
          </CustomButton>
        </form>
      </Form>
    </div>
  );
}
