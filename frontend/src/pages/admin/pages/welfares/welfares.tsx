import AdminHeader from "../../components/header/admin-header";
import { TableError } from "../../components/loaders/table.errors";
import { TableSkeleton } from "../../components/loaders/table.loader";
import { useAdminDeleteResource } from "../../services/delete/query";
import { useFetchAllWelfares } from "../../services/welfare/queries";
import WelfaresTable from "./table/table";

export default function Welfares() {
  const { data: welfares, isLoading, isError, error } = useFetchAllWelfares();
  const { mutateAsync: deleteWelfare } = useAdminDeleteResource(
    "welfare-programs",
    "welfares"
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteWelfare(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      {/* Header */}
      <AdminHeader
        title="Welfare Programs"
        description="Manage your welfare programs here."
        buttons={[
          { title: "Create Welfare Program", link: "/admin/welfares/add" },
        ]}
      />
      {/* Data Table */}
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <TableError error={error as unknown as ErrorResponse} />
      ) : (
        <WelfaresTable data={welfares || []} handleDelete={handleDelete} />
      )}
    </section>
  );
}
