import { Outlet } from "react-router-dom";
import { Navbar } from "../client/components/navbar/navbar";

export default function AuthLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-svh ">
        <Outlet />
      </main>
    </>
  );
}
