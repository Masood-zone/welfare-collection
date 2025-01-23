import AdminHeader from "@/pages/admin/components/header/admin-header";
import AddWelfareForm from "./add-welfare-form";

export default function AddWelfare() {
  return (
    <section className="w-full mx-auto space-y-10">
      {/* Header */}
      <AdminHeader
        title="Add Welfare"
        description="Add a new welfare to the system."
        buttons={[{ title: "Back", link: "/admin/welfares", type: "button" }]}
      />
      {/* Form */}
      <div>
        <AddWelfareForm />
      </div>
    </section>
  );
}
