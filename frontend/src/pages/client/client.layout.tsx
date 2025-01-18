import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import Footer from "./components/navbar/footer";

export default function ClientLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
