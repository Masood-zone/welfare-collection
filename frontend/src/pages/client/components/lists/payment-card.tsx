import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, CreditCard, User } from "lucide-react";

export function PaymentCard({ payment }: { payment: Payments }) {
  return (
    <Card className="w-auto h-auto">
      <CardHeader>
        <CardTitle>{payment?.welfareProgram?.name}</CardTitle>
        <CardDescription>
          {payment?.welfareProgram?.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm text-muted-foreground">Amount:</span>
              <span className="ml-1 font-semibold">Ghc{payment?.amount}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm text-muted-foreground">Date:</span>
              <span className="ml-1">
                {new Date(payment?.paymentDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm text-muted-foreground">Paid by:</span>
              <span className="ml-1">{payment?.user?.name}</span>
            </div>
            {/* Mode */}
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">Mode:</span>
              <span className="ml-1">{payment?.paymentMode}</span>
            </div>
            {/* Cycle */}
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">Cycle:</span>
              <span className="ml-1">
                {payment.welfareProgram.paymentCycle.charAt(0) +
                  payment.welfareProgram.paymentCycle.slice(1).toLowerCase()}
              </span>
            </div>
            {/* Receipt */}
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">Receipt:</span>
              <span className="ml-1">{payment?.receiptNumber}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
