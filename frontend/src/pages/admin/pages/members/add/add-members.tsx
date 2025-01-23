import AdminHeader from "@/pages/admin/components/header/admin-header";
import AddMembersForm from "./add-members-form";

export default function AddMembers() {
  return (
    <section className="w-full mx-auto space-y-10">
      {/* Header */}
      <AdminHeader
        title="Add Member"
        description="Add a new member to the system."
        buttons={[{ title: "Back", link: "/admin/members", type: "button" }]}
      />
      {/* Form */}
      <div>
        <AddMembersForm />
      </div>
    </section>
  );
}
