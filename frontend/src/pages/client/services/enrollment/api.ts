import { api } from "@/api/api";

export const createEnrollment = async (data: CreateEnrollment) => {
  const response = await api.post("/enrollments", data);
  return response.data;
};

export const fetchMyEnrollments = async (userId: string) => {
  const response = await api.get(`/enrollments/user/${userId}`);
  return response.data;
};

export const updateMyEnrollment = async (data: UpdateEnrollment) => {
  const response = await api.patch(`/enrollments/${data.id}`, data);
  return response.data;
};
