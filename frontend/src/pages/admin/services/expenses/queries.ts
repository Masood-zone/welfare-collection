import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWelfareProgramExpense,
  getWelfareProgramExpenses,
  getWelfarePrograms,
  getWelfareProgramTotals,
  updateWelfareProgramExpense,
} from "./api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useFetchWelfarePrograms = () => {
  return useQuery({
    queryKey: ["welfare-programs"],
    queryFn: async () => {
      const response = await getWelfarePrograms();
      return response;
    },
  });
};

export const useCreateWelfareProgramExpense = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: CreateExpense) => {
      const response = await createWelfareProgramExpense(data);
      return response;
    },
    onSuccess: (data) => {
      const { expense } = data;
      queryClient.invalidateQueries({
        queryKey: ["welfare-programs"],
      });
      toast.success("Expense created successfully", {
        duration: 3000,
      });
      navigate(`/admin/expenses/${expense.welfareProgramId}`);
    },
  });
};

export const useUpdateWelfareProgramExpense = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: UpdateExpense) => {
      const response = await updateWelfareProgramExpense(data?.id ?? "", data);
      return response;
    },
    onSuccess: (data) => {
      const { expense } = data;

      queryClient.invalidateQueries({
        queryKey: ["welfare-programs"],
      });
      toast.success("Expense updated successfully", {
        duration: 3000,
      });
      navigate(`/admin/expenses/${expense.welfareProgramId}/view-expense`);
    },
  });
};

export const useFetchWelfareProgramExpenses = (id: string) => {
  return useQuery({
    queryKey: ["welfare-programs", id, "expenses"],
    queryFn: async () => {
      const response = await getWelfareProgramExpenses(id);
      return response;
    },
  });
};

export const useFetchWelfareProgramTotals = (id: string) => {
  return useQuery({
    queryKey: ["welfare-programs", id, "totals"],
    queryFn: async () => {
      const response = await getWelfareProgramTotals(id);
      return response;
    },
  });
};
