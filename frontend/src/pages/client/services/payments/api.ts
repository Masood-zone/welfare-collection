import { api } from "@/api/api";

export const createPayment = async (data: CreatePayment) => {
  const response = await api.post("/payments", data);
  return response.data;
};

export const initializePaystackPayment = async (data: CreatePayment) => {
  const response = await api.post("/payments/initialize-paystack", data);
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

export const updatePaymentStatus = async (
  id: string,
  reference: string,
  data: { status: string }
) => {
  const response = await api.patch(`/payments/${id}/${reference}`, data);
  return response.data;
};

export const trackMyPayments = async (userId: string) => {
  const response = await api.get(`/payment-tracker/user/${userId}`);
  return response.data?.paymentTrackers;
};

export const paymentDetails = async (id: string) => {
  const response = await api.get(`/payment-tracker/${id}`);
  return response.data?.paymentTracker;
};
