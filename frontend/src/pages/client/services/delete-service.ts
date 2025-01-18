import { api } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUserDeleteResource = (resource: string, queryKey: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete", resource],
    mutationFn: (id: string | number) => api.delete(`/${resource}/${id}`),
    onMutate: (id) => {
      toast("Deleting...", {
        description: `Deleting ${resource} with ID ${id}...`,
      });
    },
    onSuccess: () => {
      // Invalidate the query to refresh the table
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      toast("Deleted", {
        description: `${resource} deleted successfully.`,
      });
    },
    onError: (error, id) => {
      console.error(error);
      toast("Error", {
        description: `Failed to delete ${resource} with ID ${id}.`,
      });
    },
  });
};
