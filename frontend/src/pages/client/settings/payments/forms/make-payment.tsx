import { useUserStore } from "@/store/use-user.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useCreatePayment,
  useInitializePaystackPayment,
  useUpdatePaymentStatus,
} from "@/pages/client/services/payments/queries";
import { Link, useNavigate } from "react-router-dom";
import { useFetchUserEnrolledWelfarePrograms } from "@/pages/client/services/welfare/queries";
import PaystackPop from "@paystack/inline-js";
import {
  AmountInput,
  PaymentModeSelect,
  WelfareProgramSelect,
} from "./payment-form-components";
import { toast } from "sonner";
import { formSchema } from "./form-schema";
const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

export default function MakePayment() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { mutateAsync: createPayment, isPending: isCreatingPayment } =
    useCreatePayment();
  const {
    mutateAsync: initializePaystackPayment,
    isPending: isInitializingPaystack,
  } = useInitializePaystackPayment();
  const { mutateAsync: updatePaymentStatus } = useUpdatePaymentStatus(
    user?.id ?? ""
  );
  const { data: welfarePrograms, isLoading } =
    useFetchUserEnrolledWelfarePrograms(user?.id ?? "");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handlePaystackPayment = async (paymentData: PaymentData) => {
    const popup = new PaystackPop();
    popup.newTransaction({
      key: paystackPublicKey || "",
      email: user?.email || "",
      amount: paymentData.amount * 100, // Convert to pesewas
      currency: "GHS",
      reference: paymentData.paystackreference,
      onSuccess: async () => {
        try {
          await updatePaymentStatus({
            id: paymentData.id,
            reference: paymentData.paystackreference,
            status: "PAID",
          });
        } catch (error) {
          console.error("Error updating payment status:", error);
        } finally {
          navigate("/settings/payments");
        }
      },
      onCancel: () => {
        console.log("Payment canceled");
        toast.error("Payment canceled", {
          description: "You have canceled the payment process.",
        });
      },
    });
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.paymentMode === "CASH") {
        await createPayment({
          userId: user?.id ?? "",
          email: user?.email ?? "",
          ...values,
        });
      } else {
        const paymentData = await initializePaystackPayment({
          userId: user?.id ?? "",
          email: user?.email ?? "",
          ...values,
        });
        handlePaystackPayment(paymentData.payment);
      }
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
                  <WelfareProgramSelect
                    control={form.control}
                    welfarePrograms={welfarePrograms}
                    isLoading={isLoading}
                  />
                </div>
              </div>
              <PaymentModeSelect control={form.control} />
              <AmountInput control={form.control} />
              <Button
                type="submit"
                disabled={isCreatingPayment || isInitializingPaystack}
              >
                {isCreatingPayment || isInitializingPaystack
                  ? "Processing..."
                  : "Make Payment"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
