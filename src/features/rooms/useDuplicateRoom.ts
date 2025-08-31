import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

const useDuplicateRoom = () => {
  const queryClient = useQueryClient();

  const { mutate: duplicateExistingRoom, isPending: isDuplicating } =
    useMutation({
      mutationFn: duplicateRoom,
      onSuccess: () => {
        toast.success("Room duplicated successfully!");
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      },
      onError: () => toast.error("Failed to duplicate room"),
    });
  return { duplicateExistingRoom, isDuplicating };
};

export default useDuplicateRoom;
