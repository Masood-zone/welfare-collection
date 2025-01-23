import { FormSkeleton } from "@/components/shared/loader/form-skeleton";
import UserNotFound from "@/components/shared/not-found/user-not-found";
import { useFetchWelfare } from "@/pages/admin/services/welfare/queries";
import { useParams } from "react-router-dom";
import EditWelfareForm from "./edit-welfare-form";
import AdminHeader from "@/pages/admin/components/header/admin-header";

export default function EditWelfare() {
  const { id } = useParams<{ id: string }>();
  const { data: welfare, isLoading } = useFetchWelfare(id ?? "");

  if (!welfare) {
    return (
      <UserNotFound
        title="Welfare program not found"
        description="The welfare program you are looking for does not exist."
      />
    );
  }

  if (isLoading) {
    return <FormSkeleton />;
  }

  return (
    <section>
      {/* Header */}
      <AdminHeader
        title="Edit Welfare Program"
        description="Edit welfare program details"
        buttons={[{ title: "Back", link: "/admin/welfares" }]}
      />
      {/* Form */}
      <div>
        <EditWelfareForm welfare={welfare} />
      </div>
    </section>
  );
}
