import { useQuery } from "@tanstack/react-query";
import {
  fetchAllWelfarePrograms,
  fetchUserEnrolledWelfarePrograms,
  fetchWelfareProgram,
} from "./api";

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

export const useFetchUserEnrolledWelfarePrograms = (id: string) => {
  return useQuery({
    queryKey: ["enrolled-welfare-programs", id],
    queryFn: async () => {
      const response = await fetchUserEnrolledWelfarePrograms(id);
      return response;
    },
  });
};
