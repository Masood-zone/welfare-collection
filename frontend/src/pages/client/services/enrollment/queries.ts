import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createEnrollment,
  fetchMyEnrollments,
  updateMyEnrollment,
} from "./api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/use-user.store";

export const useCreateEnrollment = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  return useMutation({
    mutationFn: (data: CreateEnrollment) => createEnrollment(data),
    mutationKey: ["createEnrollment"],
    onSuccess: () => {
      toast.success("Enrolled", {
        description: "You have successfully enrolled in the welfare program",
        duration: 5000,
      });
      navigate(`/user/${user?.id}/dashboard`);
    },
  });
};

export const useMyEnrollments = (userId: string) => {
  return useQuery({
    queryKey: ["myEnrollments", userId],
    queryFn: () => fetchMyEnrollments(userId),
  });
};

export const useMyUpdateEnrollment = (userId: string) => {
  return useMutation({
    mutationFn: (data: UpdateEnrollment) => updateMyEnrollment(data),
    mutationKey: ["myUpdateEnrollment", userId],
  });
};
