import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function WelfaresTable({
  data,
  handleDelete,
}: {
  data: WelfareProgramLists[];
  handleDelete: (id: string) => void;
}) {
  return <DataTable columns={columns({ handleDelete })} data={data || []} />;
}
