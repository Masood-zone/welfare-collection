import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EnrollmentsTableProps {
  data: EnrollmentLists[];
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
}

export function EnrollmentsTable({
  data,
  handleApprove,
  handleReject,
}: EnrollmentsTableProps) {
  const columns: ColumnDef<EnrollmentLists>[] = [
    {
      accessorKey: "user.name",
      header: "User Name",
    },
    {
      accessorKey: "user.email",
      header: "User Email",
    },
    {
      accessorKey: "welfareProgram.name",
      header: "Program Name",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={
              status === "APPROVED"
                ? "default"
                : status === "REJECTED"
                ? "destructive"
                : "outline"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "enrolledAt",
      header: "Enrolled At",
      cell: ({ row }) => {
        return new Date(row.getValue("enrolledAt")).toLocaleDateString();
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const enrollment = row.original;
        return (
          <div className="flex space-x-2">
            {enrollment.status === "PENDING" && (
              <>
                <Button size="sm" onClick={() => handleApprove(enrollment.id)}>
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleReject(enrollment.id)}
                >
                  Reject
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
