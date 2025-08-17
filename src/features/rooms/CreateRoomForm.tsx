import { useForm, type SubmitHandler } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createRoom } from "../../services/apiRooms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { FormData } from "./roomsTypes";
import FormRow from "../../ui/FormRow";

function CreateRoomForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  // queryClient to invalidate queries to refetch the data immediately after any mutation
  const queryClient = useQueryClient();

  // useMutation hook for inserting new rooms into the database
  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      toast.success("Room created successfully!");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      reset();
    },
    onError: () => toast.error("Failed to create room"),
  });

  // The form submission function
  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutate(data);
  };

  // const onError = (errors: FieldErrors<FormData>) => {
  //   console.error("Form submission errors:", errors);
  //   toast.error("Please fill in all required fields.");
  // };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={errors.name?.message} label="Room name">
        <Input
          type="text"
          id="name"
          autoComplete="input"
          disabled={isCreating}
          {...register("name", { required: "Room name is required" })}
        />
      </FormRow>

      <FormRow error={errors.maxCapacity?.message} label="Maximum capacity">
        <Input
          type="number"
          id="maxCapacity"
          autoComplete="input"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          {...register("discount", {
            required: "Discount is required",

            validate: (value: number) =>
              value <= Number(getValues("regularPrice")) ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow error={errors.description?.message} label="Description for room">
        <Textarea
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", { required: "Description is required" })}
        />
      </FormRow>

      <FormRow label="Room photo">
        <FileInput id="image" accept="image/*" disabled={isCreating} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateRoomForm;
