import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "react-router-dom";
import { useUserStore } from "@/store/use-user.store";
import {
  useFetchAWelfareProgram,
  useResubmitEnrollment,
} from "@/pages/client/services/welfare/queries";

export default function ResubmitEnrollment() {
  const { id, enrollmentId } = useParams<{
    id: string;
    enrollmentId: string;
  }>();

  const { user } = useUserStore();
  const { data: welfareProgram, isPending } = useFetchAWelfareProgram(id ?? "");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { mutateAsync: resubmit, isPending: isResubmitting } =
    useResubmitEnrollment();

  if (isPending) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!welfareProgram) {
    return (
      <div className="container mx-auto p-4">
        There is no welfare program with the id {id}
      </div>
    );
  }

  const handleResubmit = async () => {
    if (!user?.id) return;
    try {
      await resubmit({
        id: enrollmentId ?? "",
        userId: user.id,
        welfareProgramId: welfareProgram.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center space-x-2 justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Re-submit Enrollment</h1>
          <p className="text-lg">
            Re-submit your enrollment for the welfare program below.
          </p>
        </div>
        <Link to="welfares" className="text-primary underline">
          Go Back
        </Link>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{welfareProgram.name}</CardTitle>
          <CardDescription>{welfareProgram.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            Payment:
            <span className="text-lg font-bold text-primary ml-2">
              Ghc{welfareProgram.amount}{" "}
              {welfareProgram.paymentCycle.toLowerCase()}
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            By re-submitting your enrollment in this program, you agree to pay
            the stated amount of{" "}
            <span className="text-lg font-bold text-primary">
              Ghc{welfareProgram.amount}{" "}
              {welfareProgram.paymentCycle.toLowerCase()}
            </span>
            . Please read and agree to the terms before re-submitting.
          </p>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms and conditions
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleResubmit}
            disabled={!agreeToTerms || isResubmitting}
            className="w-full"
          >
            {isResubmitting ? "Re-submitting..." : "Re-submit Enrollment"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
