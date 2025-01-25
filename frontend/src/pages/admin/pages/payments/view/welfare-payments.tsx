import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetWelfarePayments } from "@/pages/admin/services/payments/queries";
import { EditPaymentModal } from "@/pages/client/components/modals/edit-payment.modal";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface WelfarePayment {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  paymentDate: string;
  paymentMode: string;
  status: string;
  welfareProgram: WelfareProgram;
}

const columns: ColumnDef<WelfarePayment>[] = [
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GHC",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
  },
  {
    accessorKey: "paymentMode",
    header: "Payment Mode",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export default function WelfarePayments() {
  const navigate = useNavigate();
  const { welfareId } = useParams();
  const {
    data: payments,
    isLoading,
    error,
  } = useGetWelfarePayments(welfareId as string);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<WelfarePayment | null>(
    null
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const allPayments = payments || [];
  const paidPayments = allPayments.filter(
    (payment: WelfareProgram) => payment.status === "PAID"
  );
  const unpaidPayments = allPayments.filter(
    (payment: WelfareProgram) => payment.status === "UNPAID"
  );

  const unpaidColumns: ColumnDef<WelfarePayment>[] = [
    ...columns,
    {
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <div className="flex space-x-2">
            <Link to={`/admin/payments/${welfareId}/${payment.id}/edit`}>
              <Button variant="outline">Edit Payment</Button>
            </Link>
            <Button
              onClick={() => {
                setSelectedPayment(payment);
                setIsEditModalOpen(true);
              }}
            >
              Pay Remaining
            </Button>
          </div>
        );
      },
    },
  ];

  const handleGoBack = () => {
    navigate("/admin/payments");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">
          {/* {payments?.[0].welfareProgram?.name} Payments */}
          Welfare Program Payments
        </h1>
        <Button onClick={handleGoBack}>Go Back</Button>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <DataTable columns={columns} data={allPayments} />
        </TabsContent>
        <TabsContent value="paid">
          <DataTable columns={columns} data={paidPayments} />
        </TabsContent>
        <TabsContent value="unpaid">
          <DataTable columns={unpaidColumns} data={unpaidPayments} />
        </TabsContent>
      </Tabs>
      {selectedPayment && (
        <EditPaymentModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          paymentId={selectedPayment.id}
          remainingAmount={
            selectedPayment.welfareProgram.amount - selectedPayment.amount
          }
        />
      )}
    </div>
  );
}
