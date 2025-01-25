import { useMutation, useQuery } from "@tanstack/react-query";
import { createPayment, getWelfarePayments, updatePayment } from "./api";
import { toast } from "sonner";

export const useGetWelfarePayments = (welfareId: string) => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: () => getWelfarePayments(welfareId),
  });
};

export const useCreateUserPayment = () => {
  return useMutation({
    mutationFn: (data: CreatePayment) => createPayment(data),
    mutationKey: ["create-payment"],
    onSuccess: () => {
      toast.success("Payment created successfully");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`, {
        description: "Failed to create payment",
      });
    },
  });
};

export const useUpdateUserPayment = () => {
  return useMutation({
    mutationFn: (data: UpdatePayment) => updatePayment(data.id ?? "", data),
    mutationKey: ["update-payment"],
    onSuccess: () => {
      toast.success("Payment updated successfully");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`, {
        description: "Failed to update payment",
      });
    },
  });
};
