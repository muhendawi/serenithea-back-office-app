import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

const useDeleteRoom = (name: string) => {
  const queryClient = useQueryClient();
  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      toast.success(
        <span>
          Room{" "}
          <span
            style={{
              textDecoration: "underline",
            }}
          >
            {name}
          </span>{" "}
          is successfully deleted
        </span>
      );
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
    onError: (err) => {
      toast.error(
        err.message || "Something went wrong while deleting the room."
      );
    },
  });
  return { mutate, isDeleting };
};

export default useDeleteRoom;
