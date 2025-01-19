import { Cog, User } from "lucide-react";
import { Outlet } from "react-router-dom";
import { AdminSettingsSidebar } from "../../components/sidebar/settings-sidebar";

export default function AdminSettings() {
  const sidebarItems = [
    { title: "Settings", href: "/admin/settings", icon: Cog },
    { title: "Account", href: "/admin/settings/account", icon: User },
    // { title: "Payments", href: "/settings/payments", icon: HandCoins },
    // {
    //   title: "Track Payments",
    //   href: "/settings/track-payments",
    //   icon: Banknote,
    // },
    // { title: "Welfares", href: "/settings/welfares", icon: NotebookPen },
  ];
  return (
    <div className="max-w-7xl grid flex-1 h-full gap-12 md:grid-cols-[200px_1fr] py-8 mx-auto">
      <AdminSettingsSidebar items={sidebarItems} />
      <main className="flex w-full flex-1 flex-col overflow-hidden md:px-0 px-6">
        <Outlet />
      </main>
    </div>
  );
}
