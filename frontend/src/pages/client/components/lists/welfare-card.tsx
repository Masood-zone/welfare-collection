import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "@/store/use-user.store";

export function WelfareCard({
  program,
  status,
  isEnrolled,
}: {
  program: WelfareProgram;
  status?: string;
  isEnrolled?: boolean;
}) {
  const { user } = useUserStore();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{program.name}</CardTitle>
        <CardDescription>{program.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm text-muted-foreground">
              {program.paymentCycle.charAt(0) +
                program.paymentCycle.slice(1).toLowerCase()}{" "}
              payment of
            </span>
            <span className="text-lg text-primary font-semibold ml-1">
              Ghc{program.amount}
            </span>
          </div>
          {/* Status */}
          {status && (
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span
                className={`text-sm 
                ${
                  status === "APPROVED"
                    ? "text-primary"
                    : status === "REJECTED"
                    ? "text-destructive"
                    : "text-muted-foreground"
                }
                font-semibold ml-1`}
              >
                {status}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {isEnrolled ? (
          <Button variant="secondary" className="w-full" disabled>
            Enrolled
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link to={`/user/${user?.id}/apply/${program.id}`}>Enroll Now</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
