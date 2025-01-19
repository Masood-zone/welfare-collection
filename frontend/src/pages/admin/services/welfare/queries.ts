import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchWelfareById,
  fetchAllWelfares,
  updateWelfare,
  createWelfare,
} from "./api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useCreateWelfare = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: CreateWelfareProgram) => createWelfare(data),
    mutationKey: ["createWelfare"],
    onSuccess: () => {
      toast("Welfare program created successfully", {
        description: "Welfare program has been added to the system.",
        duration: 5000,
      });
      navigate("/admin/welfares");
    },
    onError: (error) => {
      toast.error("Welfare program creation failed. ", {
        description: error.message,
        duration: 5000,
      });
    },
  });
};

export const useFetchAllWelfares = () => {
  return useQuery({
    queryKey: ["welfares"],
    queryFn: fetchAllWelfares,
  });
};

export const useFetchWelfare = (id: string) => {
  return useQuery({
    queryKey: ["welfare", id],
    queryFn: () => fetchWelfareById(id),
  });
};

export const useUpdateWelfare = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWelfareProgram }) => {
      if (!id) {
        throw new Error("ID is required");
      }
      return updateWelfare(id, data);
    },
    mutationKey: ["updateWelfare"],
    onSuccess: () => {
      toast("Welfare program updated successfully", {
        description: "Welfare program has been updated.",
        duration: 5000,
      });
      navigate("/admin/welfares");
    },
    onError: (error) => {
      toast.error("Welfare program update failed. ", {
        description: error.message,
        duration: 5000,
      });
    },
  });
};
