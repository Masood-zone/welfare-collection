import { FormSkeleton } from "@/components/shared/loader/form-skeleton";
import UserNotFound from "@/components/shared/not-found/user-not-found";
import { useFetchMember } from "@/pages/admin/services/members/queries";
import { useParams } from "react-router-dom";
import EditMemberForm from "./edit-member-form";
import AdminHeader from "@/pages/admin/components/header/admin-header";

export default function EditMember() {
  const { id } = useParams<{ id: string }>();
  const { data: member, isLoading } = useFetchMember(id ?? "");

  if (!member) {
    return (
      <UserNotFound
        title="Member not found"
        description="The member you are looking for does not exist."
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
        title="Edit Member"
        description="Edit member details"
        buttons={[{ title: "Back", link: "/admin/members" }]}
      />
      {/* Form */}
      <div>
        <EditMemberForm member={member} />
      </div>
    </section>
  );
}
