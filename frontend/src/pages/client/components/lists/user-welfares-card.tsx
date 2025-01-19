import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface WelfareCardProps {
  welfare: {
    id: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    welfareProgram: WelfareProgram;
  };
}

export function UserWelfaresCard({ welfare }: WelfareCardProps) {
  const { status, welfareProgram } = welfare;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{welfareProgram.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {welfareProgram.description}
        </p>
        <div className="grid gap-2">
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm text-muted-foreground">Amount:</span>
            <span className="ml-1 font-semibold">
              Ghc{welfareProgram.amount}
            </span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm text-muted-foreground">
              Payment Cycle:
            </span>
            <span className="ml-1">{welfareProgram.paymentCycle}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {status === "PENDING" && (
          <Button disabled className="w-full">
            Enrolled
          </Button>
        )}
        {status === "APPROVED" && (
          <Button disabled className="w-full">
            Approved
          </Button>
        )}
        {status === "REJECTED" && (
          <Button asChild className="w-full">
            <Link to={`/settings/resubmit/${welfareProgram.id}/${welfare.id}`}>
              Re-submit
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
