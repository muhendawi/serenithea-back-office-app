import type { FormDataTypes } from "../types/roomsFormTypes";
import { supabase, supabaseUrl } from "./supabase";

//------------------------------------------------------------------------------------------------
/* GETTINGT ROOMS */
//------------------------------------------------------------------------------------------------
export const getRooms = async () => {
  const { data: rooms, error } = await supabase.from("rooms").select("*");

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch Rooms");
  }
  return rooms;
};

//------------------------------------------------------------------------------------------------
/* DELETING A SPECIFIC ROOM */
//------------------------------------------------------------------------------------------------
export const deleteRoom = async (id: number) => {
  const { error } = await supabase.from("rooms").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Room could not be deleted!");
  }
};

//------------------------------------------------------------------------------------------------
/* CREATING NEW ROOM */
//------------------------------------------------------------------------------------------------
// Type guard function
const isFile = (image: FileList | File | string): image is File => {
  return image instanceof File;
};

export const createRoom = async (newRoom: FormDataTypes) => {
  // Type guard check
  if (!isFile(newRoom.image)) {
    throw new Error("Image must be a File object for room creation");
  }

  const imageName = `${newRoom.image.name}-${Math.random()}`
    .replaceAll("/", "")
    .replaceAll(" ", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;

  // 1. Creating a room
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
    // without specifying select(), single() the return data will be NULL
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

//------------------------------------------------------------------------------------------------
/* UPDATING AN EXISTING ROOM */
//------------------------------------------------------------------------------------------------
export const updateRoom = async (updatedRoom: FormDataTypes) => {
  let hasImagePath;
  let imageName;

  if (updatedRoom.image instanceof File)
    imageName = `${updatedRoom.image.name}-${Math.random()}`
      .replaceAll("/", "")
      .replaceAll(" ", "");

  if (typeof updatedRoom.image === "string")
    hasImagePath = updatedRoom.image.startsWith(supabaseUrl);

  const imagePath = hasImagePath
    ? updatedRoom.image
    : `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;

  const { data, error } = await supabase
    .from("rooms")
    .update({ ...updatedRoom, image: imagePath })
    .eq("id", updatedRoom.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Room cannot be updated");
  }

  return data;
};
