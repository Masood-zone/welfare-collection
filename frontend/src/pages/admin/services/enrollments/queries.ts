import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveEnrollment,
  createEnrollment,
  fetchAllEnrollments,
  fetchEnrollmentById,
  fetchUserEnrollment,
  rejectEnrollment,
  updateEnrollment,
} from "./api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useFetchAllEnrollments = () => {
  return useQuery({
    queryKey: ["enrollments"],
    queryFn: fetchAllEnrollments,
  });
};

export const useFetchEnrollmentById = (id: string) => {
  return useQuery({
    queryKey: ["enrollment", id],
    queryFn: () => fetchEnrollmentById(id),
  });
};

export const useFetchUserEnrollment = (id: string) => {
  return useQuery({
    queryKey: ["user-enrollment", id],
    queryFn: () => fetchUserEnrollment(id),
  });
};

export const useApproveEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveEnrollment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      toast.success("Enrollment approved successfully");
    },
    onError: (error) => {
      toast.error("Error creating enrollment", {
        description: error.message,
      });
    },
  });
};

export const useRejectEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => rejectEnrollment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      toast.error("Enrollment rejected");
    },
    onError: (error) => {
      toast.error("Error creating enrollment", {
        description: error.message,
      });
    },
  });
};

export const useCreateEnrollment = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: CreateEnrollment) => createEnrollment(data),
    onSuccess: () => {
      toast.success("Enrollment created successfully");
      navigate("/admin/enrollments");
    },
    onError: (error) => {
      toast.error("Error creating enrollment", {
        description: error.message,
      });
    },
  });
};

export const useUpdateEnrollment = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: UpdateEnrollment) => {
      if (!data.id) {
        throw new Error("ID is required");
      }
      return updateEnrollment(data.id, data);
    },
    onSuccess: () => {
      toast.success("Enrollment updated successfully");
      navigate("/admin/enrollments");
    },
    onError: (error) => {
      toast.error("Error updating enrollment", {
        description: error.message,
      });
    },
  });
};
