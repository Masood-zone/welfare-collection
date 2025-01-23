import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export function PaymentTrackCard({
  paymentTrack,
}: {
  paymentTrack: PaymentTrack;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {paymentTrack.welfareProgram.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm text-muted-foreground">Amount Due:</span>
            <span className="ml-1 font-semibold">
              Ghc{paymentTrack.welfareProgram.amount}
            </span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm text-muted-foreground">Cycle:</span>
            <span className="ml-1">
              {new Date(paymentTrack.cycleStart).toLocaleDateString()} -{" "}
              {new Date(paymentTrack.cycleEnd).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">Status:</span>
            <span
              className={`ml-1 font-semibold ${
                paymentTrack.paymentStatus === "PAID"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {paymentTrack.paymentStatus}
            </span>
          </div>
          {paymentTrack.payment && (
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">Paid:</span>
              <span className="ml-1">
                Ghc{paymentTrack.payment.amount} on{" "}
                {new Date(
                  paymentTrack.payment.paymentDate
                ).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`${paymentTrack.id}`}>View Status</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
