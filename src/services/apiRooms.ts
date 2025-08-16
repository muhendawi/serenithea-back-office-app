import { supabase } from "./supabase";

export const getRooms = async () => {
  const { data: rooms, error } = await supabase.from("rooms").select("*");

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch Rooms");
  }
  return rooms;
};

export const deleteRoom = async (id: number) => {
  const { error } = await supabase.from("rooms").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Room could not be deleted!");
  }
};
