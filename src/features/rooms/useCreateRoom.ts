import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

const useCreateRoom = () => {
  const queryClient = useQueryClient();

  // useMutation hook for inserting new rooms into the database
  const { mutate: createNewRoom, isPending: isCreating } = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      toast.success("Room created successfully!");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: () => toast.error("Failed to create room"),
  });

  return { createNewRoom, isCreating };
};

export default useCreateRoom;
