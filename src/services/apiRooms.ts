import { supabase, supabaseUrl } from "./supabase";

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

export const createRoom = async (newRoom: {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File;
}) => {
  const imageName = `${Math.random()}-${newRoom.image.name}`
    .replaceAll("/", "")
    .replaceAll(" ", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;

  // 1. Creating a room
  // without specifying select(), single() the return data will be NULL
  const { data, error } = await supabase
    .from("rooms")
    .insert([
      {
        name: newRoom.name,
        maxCapacity: newRoom.maxCapacity,
        regularPrice: newRoom.regularPrice,
        discount: newRoom.discount,
        description: newRoom.description,
        image: imagePath,
      },
    ])
    .select() // ✅ Return the inserted record
    .single(); // ✅ Return object instead of array

  if (error) {
    console.error(error);
    throw new Error("Failed to create Room");
  }

  // 2. Upload the image
  const { error: storageError } = await supabase.storage
    .from("room-images")
    .upload(imageName, newRoom.image);

  // 3. Delete the room IF the there was and Error uploading the image
  if (storageError) {
    await supabase.from("rooms").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Room image could not be uploaded and the room was not created!"
    );
  }

  return data;
};
