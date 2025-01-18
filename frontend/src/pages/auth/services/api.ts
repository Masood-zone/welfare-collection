import { api } from "@/api/api";

export const registerUser = async (data: RegisterUser) => {
  try {
    const response = await api.post("/user/register", data);
    return response.data;
  } catch (error) {
    throw error as Error;
  }
};

export const loginUser = async (data: LoginUser) => {
  try {
    const response = await api.post("/user/login", data);
    return response.data;
  } catch (error) {
    throw error as Error;
  }
};

export const updateUser = async (id: string, data: UpdateUser) => {
  try {
    const response = await api.patch(`/user/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error as Error;
  }
};

// export const removeUser = async (id: number) => {
//     try {
//         const response = await api.delete(`/user/delete/${id}`);
//         return response.data;
//     } catch (error) {
//         throw error as Error;
//     }
//     }
