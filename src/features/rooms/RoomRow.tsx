import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { deleteRoom } from "../../services/apiRooms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BsFillTrash3Fill } from "react-icons/bs";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 3.5rem;

  /* 👇 this means do not add border-bottom to the last RoomRow */
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  border-radius: 1rem;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Room = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

type RoomRowProps = {
  id: number;
  name?: string;
  maxCapacity?: number;
  regularPrice: number;
  discount: number;
  image?: string;
};

const RoomRow = ({
  id,
  name,
  maxCapacity,
  regularPrice,
  discount,
  image,
}: RoomRowProps) => {
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

  return (
    <TableRow role="row">
      <Img src={image} />
      <Room>{name}</Room>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button onClick={() => mutate(id)} disabled={isDeleting}>
        Delete
      </button>
    </TableRow>
  );
};

export default RoomRow;
