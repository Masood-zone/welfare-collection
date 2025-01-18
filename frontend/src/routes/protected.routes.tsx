import { useUserStore } from "@/store/use-user.store";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { user } = useUserStore();
  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }
  //   if (user?.role === "ADMIN") {
  //     return <Navigate to="/dashboard" replace />;
  //   }

  return <Outlet />;
};

export const UserAccountProtected = () => {
  const { user } = useUserStore();

  if (user?.role !== "MEMBER") {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
