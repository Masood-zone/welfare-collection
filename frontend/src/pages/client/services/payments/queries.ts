import { useMutation, useQuery } from "@tanstack/react-query";

import { createPayment, fetchMyPayments, updatePayment } from "./api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useCreatePayment = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: CreatePayment) => createPayment(data),
    mutationKey: ["createPayment"],
    onSuccess: () => {
      toast.success("Payment", {
        description: "You have successfully made a payment",
        duration: 5000,
      });
      navigate("/settings/payments");
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.status, {
        description: error.message,
        duration: 5000,
      });
    },
  });
};

export const useFetchMyPayments = (userId: string) => {
  return useQuery({
    queryKey: ["myPayments", userId],
    queryFn: () => fetchMyPayments(userId),
  });
};

export const useUpdatePayment = (userId: string) => {
  return useMutation({
    mutationFn: (data: UpdatePayment) => updatePayment(data),
    mutationKey: ["myUpdatePayment", userId],
  });
};
