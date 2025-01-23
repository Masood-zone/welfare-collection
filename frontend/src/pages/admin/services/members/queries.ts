import { useMutation, useQuery } from "@tanstack/react-query";
import {
  registerMember,
  fetchMembers,
  updateMember,
  fetchAdmins,
  fetchMember,
} from "./api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useCreateMember = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RegisterUser) => registerMember(data),
    mutationKey: ["createMember"],
    onSuccess: () => {
      toast("Member created successfully", {
        description: "Member has been added to the system.",
        duration: 5000,
      });
      navigate("/admin/members");
    },
    onError: (error) => {
      toast.error("Member registeration failed. ", {
        description: error.message,
        duration: 5000,
      });
    },
  });
};

export const useFetchAllAdmins = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: fetchAdmins,
  });
};
export const useFetchAllMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });
};

export const useFetchMember = (id: string) => {
  return useQuery({
    queryKey: ["member", id],
    queryFn: () => fetchMember(id),
  });
};

export const useUpdateMember = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: UpdateUser) => {
      if (!data.id) {
        throw new Error("ID is required");
      }
      return updateMember(data.id, data);
    },
    onSuccess: () => {
      toast("Member updated successfully", {
        description: "Member has been updated successfully.",
        duration: 5000,
      });
      navigate("/admin/members");
    },
    onError: (error) => {
      toast.error("Member update failed. ", {
        description: error.message,
        duration: 5000,
      });
    },
  });
};
