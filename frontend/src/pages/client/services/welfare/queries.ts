import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchAllWelfarePrograms,
  fetchUserEnrolledWelfarePrograms,
  fetchWelfareProgram,
  resubmitEnrollment,
} from "./api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useFetchAllWelfarePrograms = () => {
  return useQuery({
    queryKey: ["welfare-programs"],
    queryFn: async () => {
      const response = await fetchAllWelfarePrograms();
      return response;
    },
  });
};

export const useFetchAWelfareProgram = (id: string) => {
  return useQuery({
    queryKey: ["welfare-program", id],
    queryFn: async () => {
      const response = await fetchWelfareProgram(id);
      return response;
    },
  });
};

export const useResubmitEnrollment = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: {
      id: string;
      userId: string;
      welfareProgramId: string;
    }) => {
      const response = await resubmitEnrollment(data.id, data);
      return response;
    },
    onSuccess: () => {
      toast.success("Enrollment resubmitted successfully", {
        description:
          "Your enrollment has been resubmitted, you will be notified of the status soon.",
      });
      navigate("/settings/welfares");
    },
    onError: () => {
      toast.error("Failed to resubmit enrollment", {
        description: "There was an error resubmitting your enrollment.",
      });
    },
  });
};

export const useFetchUserEnrolledWelfarePrograms = (id: string) => {
  return useQuery({
    queryKey: ["enrolled-welfare-programs", id],
    queryFn: async () => {
      const response = await fetchUserEnrolledWelfarePrograms(id);
      return response;
    },
  });
};
