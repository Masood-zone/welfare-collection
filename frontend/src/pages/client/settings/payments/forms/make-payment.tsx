import { useUserStore } from "@/store/use-user.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreatePayment } from "@/pages/client/services/payments/queries";
import { Link } from "react-router-dom";
import { useFetchUserEnrolledWelfarePrograms } from "@/pages/client/services/welfare/queries";

const formSchema = z.object({
  welfareProgramId: z.string(),
  paymentMode: z.enum(["CASH", "CARD", "MOMO"]),
  amount: z.coerce.number().min(1).max(100000),
});

export default function MakePayment() {
  const { user } = useUserStore();
  const { mutateAsync: createPayment, isPending } = useCreatePayment();
  const { data: welfarePrograms, isLoading } =
    useFetchUserEnrolledWelfarePrograms(user?.id ?? "");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createPayment({
        userId: user?.id ?? "",
        ...values,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <h1>Make a Payment</h1>
            <Link
              to="/settings/payments"
              className="text-sm text-primary hover:text-primary-foreground"
            >
              Go Back
            </Link>
          </CardTitle>
          <CardDescription>
            Fill in the form below to make a payment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="welfareProgramId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Welfare Program</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a welfare program" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {isLoading ? (
                              <SelectItem value="loading">
                                Loading...
                              </SelectItem>
                            ) : (
                              welfarePrograms?.map((program: Enrollments) => (
                                <SelectItem
                                  key={program.welfareProgramId}
                                  value={program.welfareProgramId}
                                >
                                  {program.welfareProgram.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select a welfare program
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="paymentMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Mode</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a valid payment mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CASH">CASH</SelectItem>
                        <SelectItem value="CARD">CARD</SelectItem>
                        <SelectItem value="MOMO">Mobile Money</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can select any of these payment modes.
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
                        placeholder="Enter an amount"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is amount you are to pay
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {isPending ? "Processing..." : "Make Payment"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
