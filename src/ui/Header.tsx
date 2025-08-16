import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-50);
  padding: 1.2rem 4.8rem;
  border-radius: 3.2rem;
  box-shadow: var(--shadow-sidebar-header);
  z-index: 902;
`;
const Header = () => {
  return <StyledHeader>HEADER</StyledHeader>;
};

export default Header;
