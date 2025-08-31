import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateRoom } from "../../services/apiRooms";

const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  // A Custom Hook for useMutation hook for editing an existing room
  const { mutate: updateExistingRoom, isPending: isEditing } = useMutation({
    mutationFn: updateRoom,
    onSuccess: () => {
      toast.success("Room successfully Edited!");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: () => toast.error("Failed to Edit room"),
  });
  return { updateExistingRoom, isEditing };
};

export default useUpdateRoom;
