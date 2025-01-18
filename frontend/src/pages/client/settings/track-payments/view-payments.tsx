import { useUserStore } from "@/store/use-user.store";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrackMyPayments } from "../../services/payments/queries";
import { PaymentTrackCard } from "../../components/lists/payment-tracking-card";

export default function ViewPayments() {
  const { user } = useUserStore();
  const { data: payments, isLoading } = useTrackMyPayments(user?.id ?? "");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Track My Payments</h1>
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-full" />
          ))}
        </div>
      ) : payments && payments.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {payments.map((payment: PaymentTrack) => (
            <PaymentTrackCard key={payment.id} paymentTrack={payment} />
          ))}
        </div>
      ) : (
        <p>No payment tracks found.</p>
      )}
    </div>
  );
}
