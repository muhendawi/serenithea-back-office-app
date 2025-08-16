import RoomTable from "../features/rooms/RoomTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Rooms = () => {
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
      </Row>
    </>
  );
};

export default Rooms;
