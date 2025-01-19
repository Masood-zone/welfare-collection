import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "react-router-dom";
import {
  useFetchWelfareProgramExpenses,
  useFetchWelfareProgramTotals,
} from "@/pages/admin/services/expenses/queries";

export default function ViewExpense() {
  const { id } = useParams<{ id: string }>();
  const { data: totals, isLoading: isTotalsLoading } =
    useFetchWelfareProgramTotals(id ?? "");
  const { data: expenses, isLoading: isExpensesLoading } =
    useFetchWelfareProgramExpenses(id ?? "");

  const columns: ColumnDef<ExpenseLists>[] = [
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "GHS",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "recordedAt",
      header: "Date",
      cell: ({ row }) => {
        return new Date(row.getValue("recordedAt")).toLocaleDateString();
      },
    },
    {
      accessorKey: "recordedBy",
      header: "Recorded By",
    },
  ];

  if (isTotalsLoading || isExpensesLoading) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-[200px] w-full mb-4" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {totals?.totals.name} Expenses
      </h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-medium">Total Payments</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "GHS",
                }).format(totals?.totals.totalPayments || 0)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Expenses</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "GHS",
                }).format(totals?.totals.totalExpenses || 0)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Balance</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "GHS",
                }).format(totals?.totals.balance || 0)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Enrollment Count</p>
              <p className="text-2xl font-bold">
                {totals?.totals.enrollmentCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Expense List</h2>
        <Button asChild>
          <Link to={`/admin/expenses/${id}/create`}>Create Expense</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={expenses?.expenses || []} />
    </div>
  );
}
