import { api } from "@/api/api";

export const fetchAllEnrollments = async () => {
  const response = await api.get("/enrollments");
  return response.data;
};

export const fetchEnrollmentById = async (id: string) => {
  const response = await api.get(`/enrollments/${id}`);
  return response.data;
};

export const approveEnrollment = async (id: string) => {
  const response = await api.patch(`/enrollments/approve/${id}`);
  return response.data;
};

export const rejectEnrollment = async (id: string) => {
  const response = await api.patch(`/enrollments/reject/${id}`);
  return response.data;
};

export const createEnrollment = async (data: CreateEnrollment) => {
  const response = await api.post("/enrollments", data);
  return response.data;
};

export const updateEnrollment = async (id: string, data: UpdateEnrollment) => {
  const response = await api.patch(`/enrollments/${id}`, data);
  return response.data;
};

export const fetchUserEnrollment = async (id: string) => {
  const response = await api.get(`/enrollments/user/${id}`);
  return response.data;
};
