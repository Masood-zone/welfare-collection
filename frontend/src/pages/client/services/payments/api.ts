import { api } from "@/api/api";

export const createPayment = async (data: CreatePayment) => {
  const response = await api.post("/payments", data);
  return response.data;
};

export const fetchMyPayments = async (userId: string) => {
  const response = await api.get(`/payments/user/${userId}`);
  return response.data?.payments;
};

export const updatePayment = async (data: UpdatePayment) => {
  const response = await api.patch(`/payments/${data.id}`, data);
  return response.data;
};
