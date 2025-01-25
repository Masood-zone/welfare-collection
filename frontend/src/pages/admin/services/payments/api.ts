import { api } from "@/api/api";

export const getWelfarePayments = async (welfareId: string) => {
  const response = await api.get(`/payments/welfare/${welfareId}`);
  return response.data;
};

export const getPaymentById = async (id: string) => {
  const response = await api.get(`/payments/${id}`);
  return response.data;
};

export const getUserPayments = async (id: string) => {
  const response = await api.get(`/payments/user/${id}`);
  return response.data;
};

export const createPayment = async (data: CreatePayment) => {
  const response = await api.post("/payments", data);
  return response.data;
};

export const updatePayment = async (id: string, data: UpdatePayment) => {
  const response = await api.patch(`/payments/${id}`, data);
  return response.data;
};
