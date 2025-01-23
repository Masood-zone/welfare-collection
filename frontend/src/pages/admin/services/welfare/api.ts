import { api } from "@/api/api";

export const fetchAllWelfares = async () => {
  const response = await api.get("/welfare-programs");
  return response.data?.welfarePrograms;
};

export const fetchWelfareById = async (id: string) => {
  const response = await api.get(`/welfare-programs/${id}`);
  return response.data?.welfareProgram;
};

export const createWelfare = async (data: CreateWelfareProgram) => {
  const response = await api.post("/welfare-programs", data);
  return response.data;
};

export const updateWelfare = async (id: string, data: UpdateWelfareProgram) => {
  const response = await api.patch(`/welfare-programs/${id}`, data);
  return response.data;
};
