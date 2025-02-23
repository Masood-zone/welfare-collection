import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, updateUser } from "./api";
import { useUserStore } from "@/store/use-user.store";

export const useRegister = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: async ({ data }: { data: RegisterUser }) => {
      try {
        const response = await registerUser(data);
        return response;
      } catch (error) {
        throw error as Error;
      }
    },
    onSuccess: (data) => {
      const { user } = data;
      setUser(user);
      toast.success("Account created successfully. ", {
        description: "Welcome to the platform",
        duration: 5000,
      });
      if (user.role === "MEMBER") {
        navigate(`/user/${user.id}/dashboard`);
      } else {
        navigate(`/`);
      }
    },
    onError: (error: ErrorResponse) => {
      // Define error type later
      toast.error(error.status, {
        description: error.message,
      });
    },
  });
};

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: async ({ data }: { data: LoginUser }) => {
      try {
        const response = await loginUser(data);
        return response;
      } catch (error) {
        throw error as Error;
      }
    },
    onSuccess: (data) => {
      const { user } = data;
      setUser(user);
      toast.success("Login successful. ", {
        description: "Welcome back",
        duration: 5000,
      });
      if (user.role === "MEMBER") {
        navigate(`/user/${user.id}/dashboard`);
      } else {
        navigate(`/`);
      }
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.status, {
        description: error.message,
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateUser }) => {
      try {
        const response = await updateUser(id, data);
        return response;
      } catch (error) {
        throw error as Error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setUser(data.user);
      toast.success("Account updated successfully. ", {
        description: "Try refreshing to see changes",
        duration: 5000,
      });
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.status, {
        description: error.message,
      });
    },
  });
};
