import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/pages/admin/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminNavbar from "../components/sidebar/admin-navbar";

export default function AdminLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AdminNavbar />
          <main className="p-4 pt-0">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
