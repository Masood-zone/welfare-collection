import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchWelfarePrograms } from "../../services/expenses/queries";
import { Link } from "react-router-dom";

export default function Expenses() {
  const { data: welfarePrograms, isLoading, error } = useFetchWelfarePrograms();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Error:{" "}
        {error instanceof Error ? error.message : "An unknown error occurred"}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welfare Programs</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {welfarePrograms?.map((program: WelfareProgram) => (
          <Card key={program.id}>
            <CardHeader>
              <CardTitle>{program.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{program.description}</p>
              <Button asChild>
                <Link to={`/admin/expenses/${program.id}`}>View Expenses</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
