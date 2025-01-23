import { api } from "@/api/api";

export const fetchAdmins = async () => {
  const response = await api.get(`/user/admin/list`);
  return response.data;
};

export const fetchMembers = async () => {
  const response = await api.get(`/user/list`);
  return response.data?.members;
};

export const fetchMember = async (id: string) => {
  const response = await api.get(`/user/${id}`);
  return response.data?.user;
};

export const registerMember = async (data: RegisterUser) => {
  const response = await api.post(`/user/register`, data);
  return response.data;
};

export const updateMember = async (id: string, data: UpdateUser) => {
  const response = await api.patch(`/user/update/${id}`, data);
  return response.data;
};
