import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function MembersTable({
  data,
  handleDelete,
}: {
  data: UserLists[];
  handleDelete: (id: string) => void;
}) {
  return <DataTable columns={columns({ handleDelete })} data={data || []} />;
}
