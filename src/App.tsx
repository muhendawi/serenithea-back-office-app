import styled from "styled-components";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <StyledApp>
      <Row>
        <Row $type="horizontal">
          <Heading as="h1" $size="2xl">
            Serenithéa
          </Heading>
          <div>
            <Heading as="h2" $size="xl">
              Check in and out
            </Heading>
            <Button>Check in</Button>
            <Button>Check out</Button>
          </div>
        </Row>
        <Row $type="vertical">
          <Heading as="h3" $size="lg">
            Form
          </Heading>
          <form action="">
            <Input type="number" placeholder="number of guests" />
            <Input type="number" placeholder="number of guests" />
          </form>
        </Row>
      </Row>
    </StyledApp>
  );
}

export default App;
