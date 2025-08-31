import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../services/apiRooms";

const useRooms = () => {
  const {
    data: rooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
  return { rooms, isLoading, error };
};

export default useRooms;
