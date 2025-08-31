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
/* A HELPER FUNCTION FOR IMAGE UPLOAD */
//------------------------------------------------------------------------------------------------
const uploadImage = async (
  imageName: string,
  imageFile: File,
  id: number,
  updatedId?: number
) => {
  const { error: storageError } = await supabase.storage
    .from("room-images")
    .upload(imageName, imageFile);

  // 3. Revert the room update IF there was an error uploading the image
  if (storageError) {
    if (updatedId) {
      console.error(storageError);
      throw new Error(
        "Room image could not be uploaded and the room was not created!"
      );
    } else {
      await supabase.from("rooms").delete().eq("id", id);
      console.error(storageError);
      throw new Error(
        "Room image could not be uploaded and the room was not created!"
      );
    }
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
  await uploadImage(imageName, newRoom.image, data.id);

  return data;
};

//------------------------------------------------------------------------------------------------
/* UPDATING AN EXISTING ROOM */
//------------------------------------------------------------------------------------------------
export const updateRoom = async (updatedRoom: FormDataTypes) => {
  let imagePath: string;
  let shouldUploadImage = false;
  let imageFile: File | null = null;
  let imageName: string = "";

  // Handle different image types
  if (typeof updatedRoom.image === "string") {
    // Existing image - use the current path
    imagePath = updatedRoom.image;
    shouldUploadImage = false;
  } else if (updatedRoom.image instanceof File) {
    // New file upload
    imageFile = updatedRoom.image;
    imageName = `${imageFile.name}-${Math.random()}`
      .replaceAll("/", "")
      .replaceAll(" ", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;
    shouldUploadImage = true;
  } else {
    throw new Error("Invalid image type for room update");
  }

  // 1. Update the room in database
  const { data, error } = await supabase
    .from("rooms")
    .update({
      name: updatedRoom.name,
      maxCapacity: updatedRoom.maxCapacity,
      regularPrice: updatedRoom.regularPrice,
      discount: updatedRoom.discount,
      description: updatedRoom.description,
      image: imagePath,
    })
    .eq("id", updatedRoom.id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Room cannot be updated");
  }

  // 2. Upload the image (only if we have a new file)
  if (shouldUploadImage && imageFile) {
    await uploadImage(imageName, imageFile, data.id, updatedRoom.id);
  }

  return data;
};

//------------------------------------------------------------------------------------------------
/* DUPLICATE AN EXISTING ROOM */
//------------------------------------------------------------------------------------------------
// Type guard function
const isString = (image: FileList | File | string): image is string => {
  return typeof image === "string";
};

export const duplicateRoom = async (newRoom: FormDataTypes) => {
  // Type guard check
  if (!isString(newRoom.image)) {
    throw new Error("Image must be a File object for room creation");
  }

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
        image: newRoom.image,
      },
    ])
    // without specifying select(), single() the return data will be NULL
    .select() // ✅ Return the inserted record
    .single(); // ✅ Return object instead of array

  if (error) {
    console.error(error);
    throw new Error("Failed to create Room");
  }

  return data;
};
