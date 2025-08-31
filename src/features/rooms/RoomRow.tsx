import styled, { css } from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import type { FormDataTypes } from "../../types/roomsFormTypes";
import { useState } from "react";
import CreateRoomForm from "./CreateRoomForm";
import useDeleteRoom from "./useDeleteRoom";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useDuplicateRoom from "./useDuplicateRoom";

type TableRowProps = {
  $showFormToEdit: boolean;
};

const TableRow = styled.div<TableRowProps>`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 3.5rem;

  /* 👇 this means do not add border-bottom to the last RoomRow */
  &:not(:last-child) {
    ${({ $showFormToEdit }) =>
      $showFormToEdit
        ? css`
            border-bottom: 1px solid transparent;
          `
        : css`
            border-bottom: 1px solid var(--color-grey-100);
          `}
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

//-----------------------------------------------------------------------------------

// Type composition/nesting to not destructure all the props
type RoomRowProps = {
  room: FormDataTypes;
};

// Type guard function
const isString = (image: FileList | File | string): image is string => {
  return typeof image === "string";
};

const RoomRow = ({ room }: RoomRowProps) => {
  if (!isString(room.image)) {
    throw new Error("Image must be a string");
  }

  const { duplicateExistingRoom, isDuplicating } = useDuplicateRoom();

  const roomProps: FormDataTypes = {
    ...room,
    name: `Copy of ${room.name}`,
  };

  const handleDuplicate = () => {
    duplicateExistingRoom(roomProps);
  };

  const [showFormToEdit, setShowFormToEdit] = useState(false);

  const { mutate, isDeleting } = useDeleteRoom(room.name);

  return (
    <>
      <TableRow role="row" $showFormToEdit={showFormToEdit}>
        <Img src={room.image} />
        <Room>{room.name}</Room>
        <div>Fits up to {room.maxCapacity}</div>
        <Price>{formatCurrency(room.regularPrice)}</Price>
        <Discount>{formatCurrency(room.discount)}</Discount>
        <div>
          <button onClick={handleDuplicate} disabled={isDuplicating}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowFormToEdit((show) => !show)}>
            <HiPencil />
          </button>
          <button
            onClick={() => {
              if (typeof room.id === "number") mutate(room.id);
            }}
            disabled={isDeleting}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showFormToEdit && <CreateRoomForm roomToEdit={room} />}
    </>
  );
};

export default RoomRow;
