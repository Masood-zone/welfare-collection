import { api } from "@/api/api";

export const fetchAllWelfarePrograms = async () => {
  const response = await api.get("/welfare-programs");
  return response.data?.welfarePrograms;
};

export const fetchWelfareProgram = async (id: string) => {
  const response = await api.get(`/welfare-programs/${id}`);
  return response.data?.welfareProgram;
};

export const fetchUserEnrolledWelfarePrograms = async (id: string) => {
  const response = await api.get(`/enrollments/user/${id}`);
  return response.data?.enrollments;
};

export const resubmitEnrollment = async (
  id: string,
  data: {
    userId: string;
    welfareProgramId: string;
  }
) => {
  const response = await api.patch(
    `/enrollments/resubmit/${id}
    `,
    data
  );
  return response.data;
};
