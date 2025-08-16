import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.div`
  background-color: var(--color-grey-50);
  padding: 3.2rem 2.4rem;
  border-radius: 4rem;
  box-shadow: var(--shadow-sidebar-header);
  overflow-y: auto;
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
};
export default Sidebar;
