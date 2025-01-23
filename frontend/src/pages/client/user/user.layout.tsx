import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import UserNavbar from "../components/navbar/user-navbar";
import { UserSidebar } from "../components/sidebars/user-sidebar";

export default function UserLayout() {
  return (
    <SidebarProvider>
      <UserSidebar />
      <SidebarInset>
        <UserNavbar />
        <main className="p-4 pt-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
