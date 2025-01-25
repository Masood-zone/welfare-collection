import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchAllWelfares } from "../../services/welfare/queries";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPayments() {
  const { data: welfarePrograms, isLoading } = useFetchAllWelfares();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-[200px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="">
          <h1 className="text-2xl font-bold ">Payments</h1>
          <p className="">
            View and manage all payments made to welfare programs.
          </p>
        </div>

        <Link to="/admin/payments/add">
          <Button>Create Payment</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {welfarePrograms?.map((program: WelfareProgram) => (
          <Card key={program.id}>
            <CardHeader>
              <CardTitle>{program.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{program.description}</p>
              <p className="font-semibold mt-2">Amount: Ghc{program.amount}</p>
              <p>Payment Cycle: {program.paymentCycle}</p>
            </CardContent>
            <CardFooter>
              <Link to={`/admin/payments/${program.id}`}>
                <Button>View Payments</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
