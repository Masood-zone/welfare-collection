import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPayment,
  fetchMyPayments,
  initializePaystackPayment,
  paymentDetails,
  trackMyPayments,
  updatePayment,
  updatePaymentStatus,
} from "./api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/use-user.store";

export const useCreatePayment = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  return useMutation({
    mutationFn: (data: CreatePayment) => createPayment(data),
    mutationKey: ["createPayment"],
    onSuccess: () => {
      toast.success("Payment Recorded", {
        description: "Your cash payment has been recorded successfully.",
      });
      navigate(`/user/${user?.id}/payments`);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.status, {
        description: error.message,
      });
    },
  });
};

export const useInitializePaystackPayment = () => {
  return useMutation({
    mutationFn: (data: CreatePayment) => initializePaystackPayment(data),
    mutationKey: ["initializePaystackPayment"],
    onError: (error: ErrorResponse) => {
      toast.error(error.status, {
        description: error.message,
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

export const useUpdatePaymentStatus = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      reference,
      status,
    }: {
      id: string;
      reference: string;
      status: string;
    }) => updatePaymentStatus(id, reference, { status }),
    onSuccess: () => {
      // Optionally invalidate queries or update cache
      queryClient.invalidateQueries({ queryKey: ["myPayments", userId] });
      toast.success("Payment Successful", {
        description: "Your payment has been successfully processed.",
        duration: 5000,
      });
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.status, {
        description: error.message,
        duration: 5000,
      });
    },
  });
};

export const useTrackMyPayments = (userId: string) => {
  return useQuery({
    queryKey: ["myPayments", userId],
    queryFn: () => trackMyPayments(userId),
  });
};

export const useTrackPaymentDetails = (id: string) => {
  return useQuery({
    queryKey: ["trackPaymentDetails", id],
    queryFn: () => paymentDetails(id),
  });
};
