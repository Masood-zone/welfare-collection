import { api } from "@/api/api";

export const getWelfarePrograms = async () => {
  const response = await api.get("/welfare-programs");
  return response.data?.welfarePrograms;
};

export const createWelfareProgramExpense = async (data: CreateExpense) => {
  const response = await api.post("/expenses", data);
  return response.data;
};

export const updateWelfareProgramExpense = async (
  id: string,
  data: UpdateExpense
) => {
  const response = await api.patch(`/expenses/${id}`, data);
  return response.data;
};

export const getWelfareProgramExpenses = async (id: string) => {
  const response = await api.get(`/welfare-programs/${id}/expenses`);
  return response.data;
};

export const getWelfareProgramTotals = async (id: string) => {
  const response = await api.get(`/welfare-programs/${id}/totals`);
  return response.data;
};
