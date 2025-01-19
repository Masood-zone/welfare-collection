import { api } from "@/api/api";

export const getAnalytics = async () => {
  const response = await api.get("/analytics");
  return response.data;
};
