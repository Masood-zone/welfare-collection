import { useUserStore } from "@/store/use-user.store";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchMyPayments } from "../../../services/payments/queries";
import { Link } from "react-router-dom";
import { PaymentCard } from "../../../components/lists/payment-card";

export default function Payments() {
  const { user } = useUserStore();
  const userId = user?.id;
  const { data, isLoading, isError, error } = useFetchMyPayments(userId ?? "");

  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Payments</h1>
        <Button asChild>
          <Link to="make-payment">Make Payment</Link>
        </Button>
      </div>
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-full" />
          ))}
        </div>
      ) : data && data?.length > 0 ? (
        <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {data.map((payment: Payments) => (
            <PaymentCard key={payment?.id} payment={payment} />
          ))}
        </div>
      ) : (
        <p>No payments found.</p>
      )}
    </div>
  );
}
