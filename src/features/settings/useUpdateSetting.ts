import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  // A Custom Hook for useMutation hook for editing an existing room
  const { mutate: updateExistingSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: (updatedData) => {
      console.log(updatedData);
      toast.success("Setting successfully Updated!");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: () => toast.error("Failed to update setting"),
  });
  return { updateExistingSetting, isUpdating };
};

export default useUpdateSetting;
