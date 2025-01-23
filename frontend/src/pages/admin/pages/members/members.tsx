import AdminHeader from "../../components/header/admin-header";
import { useAdminDeleteResource } from "../../services/delete/query";
import { useFetchAllMembers } from "../../services/members/queries";
import { TableSkeleton } from "../../components/loaders/table.loader";
import { TableError } from "../../components/loaders/table.errors";
import MembersTable from "./table/table";

export default function Members() {
  const { data: members, isLoading, isError, error } = useFetchAllMembers();
  const { mutateAsync: deleteMember } = useAdminDeleteResource(
    "user",
    "members"
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteMember(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="">
      {/* Header */}
      <AdminHeader
        title="Members"
        description="Manage your members here."
        buttons={[{ title: "Create Member", link: "/admin/members/add" }]}
      />
      {/* Data Table */}
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <TableError error={error as unknown as ErrorResponse} />
      ) : (
        <MembersTable data={members || []} handleDelete={handleDelete} />
      )}
    </section>
  );
}
