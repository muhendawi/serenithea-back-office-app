import { useState } from "react";
import RoomTable from "../features/rooms/RoomTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateRoomForm from "../features/rooms/CreateRoomForm";

const Rooms = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1" $size="2xl">
          All Rooms
        </Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <RoomTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new room
        </Button>
        {showForm && <CreateRoomForm />}
      </Row>
    </>
  );
};

export default Rooms;
