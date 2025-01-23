import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "./api";

export const useGetAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: () => getAnalytics(),
  });
};
