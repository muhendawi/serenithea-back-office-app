import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import type { FormDataTypes } from "../../types/roomsFormTypes";
import FormRow from "../../ui/FormRow";
import useCreateRoom from "./useCreateRoom";
import useUpdateRoom from "./useUpdateRoom";

type CreateRoomFormProps = {
  roomToEdit: FormDataTypes;
};

function CreateRoomForm({ roomToEdit }: CreateRoomFormProps) {
  // A Custom Hook for useMutation hook for inserting new rooms into the database
  const { createNewRoom, isCreating } = useCreateRoom();

  // A Custom Hook for useMutation hook for editing an existing room
  const { updateExistingRoom, isEditing } = useUpdateRoom();

  const isCreatingOrEditing = isCreating || isEditing;

  const isEditSession = Boolean(roomToEdit?.id);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormDataTypes>({
    defaultValues: isEditSession ? roomToEdit : {},
  });

  // The form submission function
  const onSubmit = (data: FormDataTypes) => {
    // console.log("Form submitted:", { isEditSession, data });
    // Safely extract the file if it exists
    const selectedFile =
      data.image instanceof FileList && data.image.length > 0
        ? data.image[0]
        : null;

    if (isEditSession) {
      // Use new file or fallback to existing image
      const imageToUse = selectedFile || roomToEdit.image;
      updateExistingRoom(
        { ...data, image: imageToUse },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    } else {
      // Creating requires a file
      if (selectedFile) {
        createNewRoom(
          { ...data, image: selectedFile },
          {
            onSuccess: () => {
              reset();
            },
          }
        );
      } else {
        toast.error("Please select an image for the new room");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={errors.name?.message} label="Room name">
        <Input
          type="text"
          id="name"
          autoComplete="input"
          disabled={isCreatingOrEditing}
          {...register("name", { required: "Room name is required" })}
        />
      </FormRow>

      <FormRow error={errors.maxCapacity?.message} label="Maximum capacity">
        <Input
          type="number"
          id="maxCapacity"
          autoComplete="input"
          disabled={isCreatingOrEditing}
          {...register("maxCapacity", {
            required: "Max capacity is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors.regularPrice?.message} label="Regular price">
        <Input
          type="number"
          id="regularPrice"
          autoComplete="input"
          disabled={isCreatingOrEditing}
          {...register("regularPrice", {
            required: "Regular price is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors.discount?.message} label="Discount">
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          autoComplete="input"
          disabled={isCreatingOrEditing}
          {...register("discount", {
            required: "Discount is required",
            min: {
              value: 0,
              message: "Discount cannot be minus (-)",
            },
            validate: (value: number) =>
              value <= Number(getValues("regularPrice")) ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow error={errors.description?.message} label="Description for room">
        <Textarea
          id="description"
          disabled={isCreatingOrEditing}
          {...register("description", { required: "Description is required" })}
        />
      </FormRow>

      <FormRow error={errors.image?.message} label="Room photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            // this disable the required input during editing
            required: isEditSession ? false : "Image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreatingOrEditing}>
          {isEditSession ? "Edit room" : "Add room"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateRoomForm;
