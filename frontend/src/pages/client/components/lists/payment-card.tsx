import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CreditCard, Edit } from "lucide-react";
import { EditPaymentModal } from "../modals/edit-payment.modal";

export function PaymentCard({ payment }: { payment: Payments }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const latestTracker = payment?.paymentTrackers?.[0];
  const hasRemainingAmount =
    latestTracker && Number.parseFloat(latestTracker?.remainingAmount) > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {payment?.welfareProgram?.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm text-muted-foreground">Amount Paid:</span>
            <span className="ml-1 font-semibold">Ghc{payment?.amount}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm text-muted-foreground">Payment Date:</span>
            <span className="ml-1">
              {new Date(payment?.paymentDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">Status:</span>
            <span
              className={`ml-1 font-semibold ${
                payment?.status === "PAID" ? "text-green-600" : "text-red-600"
              }`}
            >
              {payment?.status}
            </span>
          </div>
          {hasRemainingAmount && (
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">Remaining:</span>
              <span className="ml-1 text-red-600">
                Ghc{latestTracker?.remainingAmount}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span> </span>
        {hasRemainingAmount && (
          <Button onClick={() => setIsEditModalOpen(true)} variant="secondary">
            <Edit className="mr-2 h-4 w-4" />
            Edit Payment
          </Button>
        )}
      </CardFooter>
      <EditPaymentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        remainingAmount={latestTracker?.remainingAmount || "0"}
        paymentId={payment.id}
      />
    </Card>
  );
}
